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
exports.BaseApiAuthMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
const core_1 = require("@cool-midway/core");
const jwt = require("jsonwebtoken");
const cache_1 = require("@midwayjs/cache");
/**
 * 權限校驗
 */
let BaseApiAuthMiddleware = class BaseApiAuthMiddleware {
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            url = url.replace(this.prefix, '');
            const token = ctx.get('Authorization');
            const apiUrl = '/api/';
            const authList = ['user', 'collection', 'tip'];
            const module = url.replace(apiUrl, '').split('/')[0];
            const moduleAuth = _.some(authList, x => x === module);
            try {
                ctx.user = jwt.verify(token, this.jwtConfig.jwt.secret);
            }
            catch (err) { }
            // 路由地址為 api前綴的 權限校驗
            if (_.startsWith(url, apiUrl)) {
                if (ctx.user) {
                    // 如果傳的token是refreshToken則校驗失敗
                    if (ctx.user.isRefresh) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效',
                        };
                        return;
                    }
                    // 判斷密碼版本是否正確
                    const passwordV = await this.cacheManager.get(`user:passwordVersion:${ctx.user.userId}`);
                    if (passwordV != ctx.user.passwordVersion) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效',
                        };
                        return;
                    }
                    const rToken = await this.cacheManager.get(`user:token:${ctx.user.userId}`);
                    if (!rToken) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效或無權限訪問',
                        };
                        return;
                    }
                    if (rToken !== token && this.jwtConfig.sso) {
                        statusCode = 401;
                    }
                    else {
                        // 角色權限校驗 - 待處理
                        // let perms: string[] = await this.cacheManager.get(
                        //   `user:perms:${ctx.user.userId}`
                        // );
                        // if (!_.isEmpty(perms)) {
                        //   perms = perms.map(e => {
                        //     return e.replace(/:/g, '/');
                        //   });
                        //   return perms;
                        //   if (!perms.includes(url.split('?')[0].replace('/api/', ''))) {
                        //     statusCode = 403;
                        //   }
                        // } else {
                        //   statusCode = 403;
                        // }
                    }
                }
                else if (moduleAuth) {
                    // 需要驗證且未登入
                    ctx.status = 401;
                    ctx.body = {
                        code: core_1.RESCODE.COMMFAIL,
                        message: '登錄失效或無權限訪問',
                    };
                    return;
                }
                if (statusCode > 200) {
                    ctx.status = statusCode;
                    ctx.body = {
                        code: core_1.RESCODE.COMMFAIL,
                        message: '登錄失效或無權限訪問',
                    };
                    return;
                }
            }
            await next();
        };
    }
};
__decorate([
    decorator_1.Config('koa.globalPrefix'),
    __metadata("design:type", Object)
], BaseApiAuthMiddleware.prototype, "prefix", void 0);
__decorate([
    decorator_1.Config('module.base'),
    __metadata("design:type", Object)
], BaseApiAuthMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.CacheManager)
], BaseApiAuthMiddleware.prototype, "cacheManager", void 0);
__decorate([
    decorator_1.App(),
    __metadata("design:type", Object)
], BaseApiAuthMiddleware.prototype, "app", void 0);
BaseApiAuthMiddleware = __decorate([
    decorator_1.Middleware()
], BaseApiAuthMiddleware);
exports.BaseApiAuthMiddleware = BaseApiAuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWF1dGguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL21pZGRsZXdhcmUvYXBpLWF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNFO0FBQ3RFLDRCQUE0QjtBQUM1Qiw0Q0FBNEM7QUFDNUMsb0NBQW9DO0FBR3BDLDJDQUErQztBQUUvQzs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBZWhDLE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ2xCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDdkIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQztZQUN2RCxJQUFJO2dCQUNGLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVB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