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
exports.BaseApiAuthService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const cache_1 = require("@midwayjs/cache");
const typeorm_1 = require("typeorm");
const md5 = require("md5");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const user_1 = require("../../entity/sys/user");
const user_2 = require("../sys/user");
const role_1 = require("../../entity/sys/role");
const department_1 = require("../../entity/sys/department");
const role_2 = require("../sys/role");
const user_role_1 = require("../../entity/sys/user_role");
const menu_1 = require("../sys/menu");
const perms_1 = require("../sys/perms");
const department_2 = require("../sys/department");
const credentials_1 = require("../../../../config/credentials");
/**
 * 登錄
 */
let BaseApiAuthService = class BaseApiAuthService extends core_1.BaseService {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        // rememberMe
        const { phone, password } = login;
        const user = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: 0 },
                { phone, status: 1 },
            ],
        });
        // 校驗用戶
        if (user) {
            // 校驗用戶狀態及密碼
            if (user.status == 1) {
                throw new core_1.CoolValidateException('該帳號已被禁用');
            }
            if (user.password !== md5(password)) {
                throw new core_1.CoolValidateException('手機或密碼不正確');
            }
        }
        else {
            throw new core_1.CoolCommException('該手機號碼尚未註冊');
        }
        // 校驗角色
        const roleIds = await this.baseSysRoleService.getByUser(user.id);
        if (_.isEmpty(roleIds)) {
            throw new core_1.CoolCommException('該用戶未分配任何角色，無法登錄');
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
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        // return perms;
        await this.cacheManager.set(`user:department:${user.id}`, departments);
        await this.cacheManager.set(`user:perms:${user.id}`, perms);
        await this.cacheManager.set(`user:token:${user.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${user.id}`, result.token);
        return result;
    }
    /**
     * 註冊
     * @param register
     */
    async register(register) {
        const { phone, verifyCode, password, passwordConfirm } = register;
        if (this.ctx.user)
            throw new core_1.CoolCommException('請登出');
        const roleLabel = 'member';
        const departmentId = 13;
        // 校驗密碼
        if (!_.isEqual(password, passwordConfirm))
            throw new core_1.CoolValidateException('請確認輸入的密碼相同');
        // 校驗用戶
        const exists = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: 0 },
                { phone, status: 1 },
            ],
        });
        if (!_.isEmpty(exists))
            throw new core_1.CoolCommException('該手機號碼已被使用');
        // 校驗驗證碼
        const username = '886' + register.phone.substring(1);
        await this.captchaCheck(`+${username}`, verifyCode);
        // 寫入資料庫
        register.password = md5(register.password);
        const save = await this.baseSysUserEntity.save({
            ...register,
            username,
            departmentId,
        });
        const roleMember = await this.baseSysRoleEntity.findOne({
            label: roleLabel,
        });
        const roleIds = [roleMember.id];
        await this.baseSysUserRoleEntity.save({
            userId: save.id,
            roleId: roleMember.id,
        });
        await this.baseSysPermsService.refreshPerms(save.id);
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const result = {
            expire,
            token: await this.generateToken(save, roleIds, expire),
            refreshExpire,
            refreshToken: await this.generateToken(save, roleIds, refreshExpire, true),
        };
        // 將用戶相關信息保存到緩存
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        await this.cacheManager.set(`user:department:${save.id}`, departments);
        await this.cacheManager.set(`user:perms:${save.id}`, perms);
        await this.cacheManager.set(`user:token:${save.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${save.id}`, result.token);
        return result;
    }
    createRandomString(len) {
        let maxLen = 8, min = Math.pow(16, Math.min(len, maxLen) - 1), max = Math.pow(16, Math.min(len, maxLen)) - 1, n = Math.floor(Math.random() * (max - min + 1)) + min, r = n.toString(16);
        while (r.length < len) {
            r = r + this.createRandomString(len - maxLen);
        }
        return r;
    }
    /**
     * 忘記密碼
     */
    async forgot(forgot) {
        const { phone, verifyCode, password, passwordConfirm } = forgot;
        // 校驗密碼
        if (!_.isEqual(password, passwordConfirm))
            throw new core_1.CoolValidateException('請確認輸入的密碼相同');
        // 校驗用戶
        const user = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: 0 },
                { phone, status: 1 },
            ],
        });
        if (_.isEmpty(user))
            throw new core_1.CoolCommException('該號碼尚未註冊');
        // 校驗驗證碼
        const username = '886' + forgot.phone.substring(1);
        await this.captchaCheck(`+${username}`, verifyCode);
        // 寫入資料庫
        forgot.password = md5(forgot.password);
        const passWordV = user.passwordV + 1;
        await this.baseSysUserEntity.save({ ...forgot, id: user.id, passWordV });
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const roleIds = await this.baseSysRoleService.getByUser(user.id);
        const result = {
            expire,
            token: await this.generateToken(user, roleIds, expire),
            refreshExpire,
            refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
        };
        // 將用戶相關信息保存到緩存
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        // return perms;
        await this.cacheManager.set(`user:department:${user.id}`, departments);
        await this.cacheManager.set(`user:perms:${user.id}`, perms);
        await this.cacheManager.set(`user:token:${user.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${user.id}`, result.token);
        return result;
    }
    /**
     * 退出登錄
     */
    async logout() {
        if (!this.ctx.user)
            throw new core_1.CoolCommException('用戶未登入');
        const userId = this.ctx.user.userId;
        await this.cacheManager.del(`user:department:${userId}`);
        await this.cacheManager.del(`user:perms:${userId}`);
        await this.cacheManager.del(`user:token:${userId}`);
        await this.cacheManager.del(`user:token:refresh:${userId}`);
    }
    /**
     * 發送手機驗證碼
     * @param captcha 國際區號
     */
    async captcha(captcha) {
        const client = require('twilio')(credentials_1.twilio.accountSid, credentials_1.twilio.authToken);
        try {
            client.verify
                .services(credentials_1.twilio.serviceSid)
                .verifications.create({ to: '+886953705508', channel: 'sms' })
                .then(verification => console.log(verification.status));
        }
        catch (e) {
            console.log(e);
        }
        return true;
    }
    /**
     * 檢驗手機驗證碼
     * @param phone 手機號
     * @param value 驗證碼
     */
    async captchaCheck(phone, code) {
        const client = require('twilio')(credentials_1.twilio.accountSid, credentials_1.twilio.authToken);
        try {
            const valid = await client.verify
                .services(credentials_1.twilio.serviceSid)
                .verificationChecks.create({ to: phone, code })
                .then(verification_check => {
                return verification_check.valid;
            });
            return valid;
        }
        catch (e) {
            throw new core_1.CoolCommException('驗證碼不正確，請重新發送');
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
        await this.cacheManager.set(`user:passwordVersion:${user.id}`, user.passwordV);
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
                await this.cacheManager.set(`user:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
                return result;
            }
        }
        catch (err) {
            console.log(err);
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_1.RESCODE.COMMFAIL,
                message: '自動登出，請重新登入',
            };
            return;
        }
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.CacheManager)
], BaseApiAuthService.prototype, "cacheManager", void 0);
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiAuthService.prototype, "baseSysUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(role_1.BaseSysRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiAuthService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiAuthService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiAuthService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseApiAuthService.prototype, "baseSysUserService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", role_2.BaseSysRoleService)
], BaseApiAuthService.prototype, "baseSysRoleService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseApiAuthService.prototype, "baseSysPermsService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseApiAuthService.prototype, "baseSysMenuService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", department_2.BaseSysDepartmentService)
], BaseApiAuthService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseApiAuthService.prototype, "ctx", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], BaseApiAuthService.prototype, "coolConfig", void 0);
BaseApiAuthService = __decorate([
    decorator_1.Provide()
], BaseApiAuthService);
exports.BaseApiAuthService = BaseApiAuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2Uvc2VydmljZS9hcGkvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEQ7QUFDOUQsNENBSzJCO0FBQzNCLHVDQUFrRDtBQUVsRCwyQ0FBK0M7QUFDL0MscUNBQXFDO0FBRXJDLDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFDNUIsb0NBQW9DO0FBRXBDLGdEQUEwRDtBQUMxRCxzQ0FBaUQ7QUFDakQsZ0RBQTBEO0FBQzFELDREQUFzRTtBQUN0RSxzQ0FBaUQ7QUFDakQsMERBQW1FO0FBQ25FLHNDQUFpRDtBQUNqRCx3Q0FBbUQ7QUFDbkQsa0RBQTZEO0FBUTdELGdFQUF3RDtBQUV4RDs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUFxQ2pEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBa0I7UUFDNUIsYUFBYTtRQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUNoRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFDcEIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTthQUNyQjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU87UUFDUCxJQUFJLElBQUksRUFBRTtZQUNSLFlBQVk7WUFDWixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixNQUFNLElBQUksNEJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLElBQUksNEJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDN0M7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTztRQUNQLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsVUFBVTtRQUNWLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzVELE1BQU0sTUFBTSxHQUFHO1lBQ2IsTUFBTTtZQUNOLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDdEQsYUFBYTtZQUNiLFlBQVksRUFBRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3BDLElBQUksRUFDSixPQUFPLEVBQ1AsYUFBYSxFQUNiLElBQUksQ0FDTDtTQUNGLENBQUM7UUFFRixlQUFlO1FBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FDbEUsT0FBTyxFQUNQLEtBQUssQ0FDTixDQUFDO1FBQ0YsZ0JBQWdCO1FBQ2hCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0UsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBd0I7UUFDckMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUVsRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0RCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLE9BQU87UUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO1lBQ3ZDLE1BQU0sSUFBSSw0QkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxPQUFPO1FBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ2xELEtBQUssRUFBRTtnQkFDTCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUNwQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpFLFFBQVE7UUFDUixNQUFNLFFBQVEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFcEQsUUFBUTtRQUNSLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDN0MsR0FBRyxRQUFRO1lBQ1gsUUFBUTtZQUNSLFlBQVk7U0FDYixDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDdEQsS0FBSyxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQ3BDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRTtTQUN0QixDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJELFVBQVU7UUFDVixNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUM1RCxNQUFNLE1BQU0sR0FBRztZQUNiLE1BQU07WUFDTixLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3RELGFBQWE7WUFDYixZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNwQyxJQUFJLEVBQ0osT0FBTyxFQUNQLGFBQWEsRUFDYixJQUFJLENBQ0w7U0FDRixDQUFDO1FBRUYsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQ2xFLE9BQU8sRUFDUCxLQUFLLENBQ04sQ0FBQztRQUNGLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN2RSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0UsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVc7UUFDNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUNaLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDN0MsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUM3QyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUNyRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFvQjtRQUMvQixNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ2hFLE9BQU87UUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO1lBQ3ZDLE1BQU0sSUFBSSw0QkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ2hELEtBQUssRUFBRTtnQkFDTCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUNwQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1RCxRQUFRO1FBQ1IsTUFBTSxRQUFRLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXBELFFBQVE7UUFDUixNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUV6RSxVQUFVO1FBQ1YsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDNUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLE1BQU0sR0FBRztZQUNiLE1BQU07WUFDTixLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3RELGFBQWE7WUFDYixZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNwQyxJQUFJLEVBQ0osT0FBTyxFQUNQLGFBQWEsRUFDYixJQUFJLENBQ0w7U0FDRixDQUFDO1FBRUYsZUFBZTtRQUNmLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLENBQ2xFLE9BQU8sRUFDUCxLQUFLLENBQ04sQ0FBQztRQUNGLGdCQUFnQjtRQUNoQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNFLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHNCQUFzQixNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXNCO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBTSxDQUFDLFVBQVUsRUFBRSxvQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLElBQUk7WUFDRixNQUFNLENBQUMsTUFBTTtpQkFDVixRQUFRLENBQUMsb0JBQU0sQ0FBQyxVQUFVLENBQUM7aUJBQzNCLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJO1FBQzVCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBTSxDQUFDLFVBQVUsRUFBRSxvQkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNO2lCQUM5QixRQUFRLENBQUMsb0JBQU0sQ0FBQyxVQUFVLENBQUM7aUJBQzNCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVU7UUFDbkQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDekIsd0JBQXdCLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FDZixDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUc7WUFDaEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTztZQUNQLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZixlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDaEMsQ0FBQztRQUNGLElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNyRCxTQUFTLEVBQUUsTUFBTTtTQUNsQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFhO1FBQzlCLElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzVELE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLE1BQU0sTUFBTSxHQUFHO29CQUNiLE1BQU07b0JBQ04sS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTt3QkFDbkQsU0FBUyxFQUFFLE1BQU07cUJBQ2xCLENBQUM7b0JBQ0YsYUFBYTtvQkFDYixZQUFZLEVBQUUsRUFBRTtpQkFDakIsQ0FBQztnQkFDRixPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDbEUsU0FBUyxFQUFFLGFBQWE7aUJBQ3pCLENBQUMsQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUN6Qix3QkFBd0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQzNDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUMzQixDQUFDO2dCQUNGLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLGNBQU8sQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDO1lBQ0YsT0FBTztTQUNSO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFwV0M7SUFEQyxrQkFBTSxFQUFFOzhCQUNLLG9CQUFZO3dEQUFDO0FBRzNCO0lBREMsdUJBQWlCLENBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzZEQUFvQjtBQUdqRDtJQURDLHVCQUFpQixDQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs2REFBb0I7QUFHakQ7SUFEQyx1QkFBaUIsQ0FBQyxpQ0FBcUIsQ0FBQzs4QkFDbEIsb0JBQVU7aUVBQXdCO0FBR3pEO0lBREMsdUJBQWlCLENBQUMsb0NBQXVCLENBQUM7OEJBQ2xCLG9CQUFVO21FQUEwQjtBQUc3RDtJQURDLGtCQUFNLEVBQUU7OEJBQ1cseUJBQWtCOzhEQUFDO0FBR3ZDO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7OERBQUM7QUFHdkM7SUFEQyxrQkFBTSxFQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLGtCQUFNLEVBQUU7OEJBQ1cseUJBQWtCOzhEQUFDO0FBR3ZDO0lBREMsa0JBQU0sRUFBRTs4QkFDaUIscUNBQXdCO29FQUFDO0FBR25EO0lBREMsa0JBQU0sRUFBRTs7K0NBQ0k7QUFHYjtJQURDLGtCQUFNLENBQUMsYUFBYSxDQUFDOztzREFDWDtBQW5DQSxrQkFBa0I7SUFEOUIsbUJBQU8sRUFBRTtHQUNHLGtCQUFrQixDQXNXOUI7QUF0V1ksZ0RBQWtCIn0=