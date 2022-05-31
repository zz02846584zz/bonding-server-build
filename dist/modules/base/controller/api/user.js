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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../entity/sys/user");
const user_2 = require("../../service/api/user");
const param_1 = require("../../service/sys/param");
const validate_1 = require("@midwayjs/validate");
const auth_1 = require("../../dto/app/auth");
/**
 * 不需要登錄的後台接口
 */
let BaseApiUserController = class BaseApiUserController extends core_1.BaseController {
    /**
     * 取得個人資料
     */
    async person() {
        return this.ok(await this.baseApiUserService.person());
    }
    /**
     * 重設密碼
     */
    async resetPassword(param) {
        return this.ok(await this.baseApiUserService.resetPassword(param));
    }
    /**
     * 身份驗證
     */
    async identityCert(param) {
        return this.ok(await this.baseApiUserService.identityCert(param));
    }
    /**
     * 綁定Email
     */
    async bindingEmail(param) {
        return this.ok(await this.baseApiUserService.bindingEmail(param));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", user_2.BaseApiUserService)
], BaseApiUserController.prototype, "baseApiUserService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseApiUserController.prototype, "baseSysParamService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseApiUserController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", core_1.CoolEps)
], BaseApiUserController.prototype, "eps", void 0);
__decorate([
    decorator_1.Get('/person', { summary: '個人資料' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseApiUserController.prototype, "person", null);
__decorate([
    decorator_1.Post('/reset-password', { summary: '重設密碼' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.ApiResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], BaseApiUserController.prototype, "resetPassword", null);
__decorate([
    decorator_1.Post('/identity-cert', { summary: '身份驗證' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseApiUserController.prototype, "identityCert", null);
__decorate([
    decorator_1.Post('/binding/email', { summary: '綁定Email' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseApiUserController.prototype, "bindingEmail", null);
BaseApiUserController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        prefix: '/api/user',
        api: ['delete', 'update', 'info'],
        entity: user_1.BaseSysUserEntity,
        service: user_2.BaseApiUserService,
    })
], BaseApiUserController);
exports.BaseApiUserController = BaseApiUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcGkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUU7QUFDdkUsNENBQTRFO0FBQzVFLGdEQUEwRDtBQUMxRCxpREFBNEQ7QUFDNUQsbURBQThEO0FBRTlELGlEQUE4QztBQUM5Qyw2Q0FBeUQ7QUFFekQ7O0dBRUc7QUFRSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBYXZEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFHSCxLQUFLLENBQUMsYUFBYSxDQUFTLEtBQTBCO1FBQ3BELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFHSCxLQUFLLENBQUMsWUFBWSxDQUFTLEtBQUs7UUFDOUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVMsS0FBSztRQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7QUE1Q0M7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjtpRUFBQztBQUd2QztJQURDLGtCQUFNLEVBQUU7OEJBQ1ksMkJBQW1CO2tFQUFDO0FBR3pDO0lBREMsa0JBQU0sRUFBRTs7a0RBQ0k7QUFHYjtJQURDLGtCQUFNLEVBQUU7OEJBQ0osY0FBTztrREFBQztBQU1iO0lBREMsZUFBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OzttREFHbkM7QUFPRDtJQUZDLGdCQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDNUMsbUJBQVEsRUFBRTtJQUNVLFdBQUEsZ0JBQUksRUFBRSxDQUFBOztxQ0FBUSwwQkFBbUI7OzBEQUVyRDtBQU9EO0lBRkMsZ0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUMzQyxtQkFBUSxFQUFFO0lBQ1MsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7eURBRXpCO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzNCLFdBQUEsZ0JBQUksRUFBRSxDQUFBOzs7O3lEQUV6QjtBQTdDVSxxQkFBcUI7SUFQakMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDZCxNQUFNLEVBQUUsV0FBVztRQUNuQixHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNqQyxNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDNUIsQ0FBQztHQUNXLHFCQUFxQixDQThDakM7QUE5Q1ksc0RBQXFCIn0=