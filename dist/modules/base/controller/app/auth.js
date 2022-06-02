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
exports.AppAuthController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const validate_1 = require("@midwayjs/validate");
const auth_1 = require("../../service/api/auth");
const auth_2 = require("../../dto/app/auth");
/**
 * 商品
 */
let AppAuthController = class AppAuthController extends core_1.BaseController {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseApiAuthService.login(login));
    }
    /**
     * 註冊
     * @param register
     */
    async register(register) {
        return this.ok(await this.baseApiAuthService.register(register));
    }
    /**
     * 註冊
     * @param forgot
     */
    async forgot(forgot) {
        return this.ok(await this.baseApiAuthService.forgot(forgot));
    }
    /**
     * 獲得驗證碼
     * @param captcha
     */
    async captcha(captcha) {
        return this.ok(await this.baseApiAuthService.captcha(captcha));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        return this.ok(await this.baseApiAuthService.refreshToken(refreshToken));
    }
    /**
     * 退出
     */
    async logout() {
        await this.baseApiAuthService.logout();
        return this.ok();
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", auth_1.BaseApiAuthService)
], AppAuthController.prototype, "baseApiAuthService", void 0);
__decorate([
    decorator_1.Post('/login', { summary: '登錄' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiLoginDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "login", null);
__decorate([
    decorator_1.Post('/register', { summary: '註冊' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiRegisterDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "register", null);
__decorate([
    decorator_1.Post('/forgot', { summary: '忘記密碼' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiForgotDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "forgot", null);
__decorate([
    decorator_1.Get('/captcha', { summary: '獲取驗證碼' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiCaptchaDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "captcha", null);
__decorate([
    decorator_1.Get('/refreshToken', { summary: '刷新token' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "refreshToken", null);
__decorate([
    decorator_1.Post('/logout', { summary: '退出' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "logout", null);
AppAuthController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController('/api/auth')
], AppAuthController);
exports.AppAuthController = AppAuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEU7QUFDOUUsNENBQW1FO0FBQ25FLGlEQUE4QztBQUM5QyxpREFBNEQ7QUFFNUQsNkNBSzRCO0FBRTVCOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQUluRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQWtCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBR0gsS0FBSyxDQUFDLFFBQVEsQ0FBUyxRQUF3QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUdILEtBQUssQ0FBQyxNQUFNLENBQVMsTUFBb0I7UUFDdkMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsT0FBTyxDQUFTLE9BQXNCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFVLFlBQW9CO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNWLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBMURDO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7NkRBQUM7QUFRdkM7SUFGQyxnQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxtQkFBUSxFQUFFO0lBQ0UsV0FBQSxnQkFBSSxFQUFFLENBQUE7O3FDQUFRLGtCQUFXOzs4Q0FFckM7QUFRRDtJQUZDLGdCQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLG1CQUFRLEVBQUU7SUFDSyxXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7cUNBQVcscUJBQWM7O2lEQUU5QztBQVFEO0lBRkMsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEMsbUJBQVEsRUFBRTtJQUNHLFdBQUEsZ0JBQUksRUFBRSxDQUFBOztxQ0FBUyxtQkFBWTs7K0NBRXhDO0FBUUQ7SUFGQyxlQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLG1CQUFRLEVBQUU7SUFDSSxXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7cUNBQVUsb0JBQWE7O2dEQUUzQztBQU1EO0lBREMsZUFBRyxDQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN6QixXQUFBLGlCQUFLLEVBQUUsQ0FBQTs7OztxREFFMUI7QUFNRDtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs7OytDQUlsQztBQTNEVSxpQkFBaUI7SUFGN0IsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUMsV0FBVyxDQUFDO0dBQ2YsaUJBQWlCLENBNEQ3QjtBQTVEWSw4Q0FBaUIifQ==