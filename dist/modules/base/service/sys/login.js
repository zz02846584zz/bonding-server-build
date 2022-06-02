"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSysLoginService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const svgCaptcha = require("svg-captcha");
const uuid_1 = require("uuid");
const user_1 = require("../../entity/sys/user");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const md5 = require("md5");
const role_1 = require("./role");
const _ = require("lodash");
const menu_1 = require("./menu");
const department_1 = require("./department");
const jwt = require("jsonwebtoken");
const svgToDataURL = require("mini-svg-data-uri");
const cache_1 = require("@midwayjs/cache");
/**
 * 登錄
 */
let BaseSysLoginService = class BaseSysLoginService extends core_1.BaseService {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        const { username, captchaId, verifyCode, password } = login;
        // 校驗驗證碼
        const checkV = await this.captchaCheck(captchaId, verifyCode);
        if (checkV) {
            const user = await this.baseSysUserEntity.findOne({ username });
            // 校驗用戶
            if (user) {
                // 校驗用戶狀態及密碼
                if (user.status !== 0) {
                    throw new core_1.CoolCommException('該帳號不被允許登入');
                }
                if (user.password !== md5(password)) {
                    throw new core_1.CoolCommException('賬戶或密碼不正確');
                }
            }
            else {
                throw new core_1.CoolCommException('賬戶或密碼不正確');
            }
            // 校驗角色
            const roleIds = await this.baseSysRoleService.getByUser(user.id);
            if (_.isEmpty(roleIds)) {
                throw new core_1.CoolCommException('該用戶未設置任何角色，無法登錄');
            }
            // 生成token
            const { expire, refreshExpire } = this.coolConfig.jwt.token;
            const result = {
                expire,
                token: await this.generateToken(user, roleIds, expire),
                refreshExpire,
                refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
            };
            // 將用戶相關信息保存到緩存
            const perms = await this.baseSysMenuService.getPerms(roleIds);
            const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, user.username === 'admin');
            await this.cacheManager.set(`admin:department:${user.id}`, departments);
            await this.cacheManager.set(`admin:perms:${user.id}`, perms);
            await this.cacheManager.set(`admin:token:${user.id}`, result.token);
            await this.cacheManager.set(`admin:token:refresh:${user.id}`, result.token);
            return result;
        }
        else {
            throw new core_1.CoolCommException('驗證碼不正確');
        }
    }
    /**
     * 驗證碼
     * @param type 圖片驗證碼類型 svg
     * @param width 寬
     * @param height 高
     */
    async captcha(type, width = 150, height = 50) {
        const svg = svgCaptcha.create({
            ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            width,
            height,
        });
        const result = {
            captchaId: uuid_1.v1(),
            data: svg.data.replace(/"/g, "'"),
        };
        // 文字變白
        const rpList = [
            '#111',
            '#222',
            '#333',
            '#444',
            '#555',
            '#666',
            '#777',
            '#888',
            '#999',
        ];
        rpList.forEach(rp => {
            result.data = result.data['replaceAll'](rp, '#fff');
        });
        if (type === 'base64') {
            result.data = svgToDataURL(result.data);
        }
        // 半小時過期
        await this.cacheManager.set(`verify:img:${result.captchaId}`, svg.text.toLowerCase(), { ttl: 1800 });
        return result;
    }
    /**
     * 退出登錄
     */
    async logout() {
        const { userId } = this.ctx.admin;
        await this.cacheManager.del(`admin:department:${userId}`);
        await this.cacheManager.del(`admin:perms:${userId}`);
        await this.cacheManager.del(`admin:token:${userId}`);
        await this.cacheManager.del(`admin:token:refresh:${userId}`);
    }
    /**
     * 檢驗圖片驗證碼
     * @param captchaId 驗證碼ID
     * @param value 驗證碼
     */
    async captchaCheck(captchaId, value) {
        const rv = await this.cacheManager.get(`verify:img:${captchaId}`);
        if (!rv || !value || value.toLowerCase() !== rv) {
            return false;
        }
        else {
            this.cacheManager.del(`verify:img:${captchaId}`);
            return true;
        }
    }
    /**
     * 生成token
     * @param user 用戶對象
     * @param roleIds 角色集合
     * @param expire 過期
     * @param isRefresh 是否是刷新
     */
    async generateToken(user, roleIds, expire, isRefresh) {
        await this.cacheManager.set(`admin:passwordVersion:${user.id}`, user.passwordV);
        const tokenInfo = {
            isRefresh: false,
            roleIds,
            username: user.username,
            userId: user.id,
            passwordVersion: user.passwordV,
        };
        if (isRefresh) {
            tokenInfo.isRefresh = true;
        }
        return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
            expiresIn: expire,
        });
    }
    /**
     * 刷新token
     * @param token
     */
    async refreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
            if (decoded && decoded['isRefresh']) {
                delete decoded['exp'];
                delete decoded['iat'];
                const { expire, refreshExpire } = this.coolConfig.jwt.token;
                decoded['isRefresh'] = false;
                const result = {
                    expire,
                    token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
                        expiresIn: expire,
                    }),
                    refreshExpire,
                    refreshToken: '',
                };
                decoded['isRefresh'] = true;
                result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
                    expiresIn: refreshExpire,
                });
                await this.cacheManager.set(`admin:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
                return result;
            }
        }
        catch (err) {
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_1.RESCODE.COMMFAIL,
                message: '登錄失效',
            };
            return;
        }
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.CacheManager)
], BaseSysLoginService.prototype, "cacheManager", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLoginService.prototype, "baseSysUserEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysLoginService.prototype, "baseSysRoleService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysLoginService.prototype, "baseSysMenuService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysLoginService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "ctx", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "coolConfig", void 0);
BaseSysLoginService = __decorate([
    decorator_1.Provide()
], BaseSysLoginService);
exports.BaseSysLoginService = BaseSysLoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCw0Q0FBNEU7QUFFNUUsMENBQTBDO0FBQzFDLCtCQUFrQztBQUNsQyxnREFBMEQ7QUFDMUQscUNBQXFDO0FBQ3JDLHVDQUFrRDtBQUNsRCwyQkFBMkI7QUFDM0IsaUNBQTRDO0FBQzVDLDRCQUE0QjtBQUM1QixpQ0FBNEM7QUFDNUMsNkNBQXdEO0FBQ3hELG9DQUFvQztBQUNwQyxrREFBa0Q7QUFFbEQsMkNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQXNCbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFlO1FBQ3pCLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUQsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87WUFDUCxJQUFJLElBQUksRUFBRTtnQkFDUixZQUFZO2dCQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQ3JCLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDMUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxRQUFR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