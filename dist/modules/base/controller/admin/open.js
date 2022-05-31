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
exports.BaseOpenController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const login_1 = require("../../dto/admin/login");
const login_2 = require("../../service/sys/login");
const param_1 = require("../../service/sys/param");
const validate_1 = require("@midwayjs/validate");
/**
 * 不需要登录的后台接口
 */
let BaseOpenController = class BaseOpenController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps.admin);
    }
    /**
     * 根据配置参数key获得网页内容(富文本)
     */
    async htmlByKey(key) {
        this.ctx.body = await this.baseSysParamService.htmlByKey(key);
    }
    /**
     * 登录
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseSysLoginService.login(login));
    }
    /**
     * 获得验证码
     */
    async captcha(type, width, height) {
        return this.ok(await this.baseSysLoginService.captcha(type, width, height));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", login_2.BaseSysLoginService)
], BaseOpenController.prototype, "baseSysLoginService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseOpenController.prototype, "baseSysParamService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseOpenController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", core_1.CoolEps)
], BaseOpenController.prototype, "eps", void 0);
__decorate([
    decorator_1.Get('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "getEps", null);
__decorate([
    decorator_1.Get('/html', { summary: '获得网页内容的参数值' }),
    __param(0, decorator_1.Query('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "htmlByKey", null);
__decorate([
    decorator_1.Post('/login', { summary: '登录' }),
    validate_1.Validate(),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "login", null);
__decorate([
    decorator_1.Get('/captcha', { summary: '验证码' }),
    __param(0, decorator_1.Query('type')),
    __param(1, decorator_1.Query('width')),
    __param(2, decorator_1.Query('height')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "captcha", null);
__decorate([
    decorator_1.Get('/refreshToken', { summary: '刷新token' }),
    __param(0, decorator_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "refreshToken", null);
BaseOpenController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], BaseOpenController);
exports.BaseOpenController = BaseOpenController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hZG1pbi9vcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RTtBQUM5RSw0Q0FBNEU7QUFDNUUsaURBQWlEO0FBQ2pELG1EQUE4RDtBQUM5RCxtREFBOEQ7QUFFOUQsaURBQThDO0FBRTlDOztHQUVHO0FBR0gsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxxQkFBYztJQWFwRDs7O09BR0c7SUFFSSxLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsU0FBUyxDQUFlLEdBQVc7UUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQWU7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQ0ksSUFBWSxFQUNYLEtBQWEsRUFDWixNQUFjO1FBRS9CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVUsWUFBb0I7UUFDOUMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDRixDQUFBO0FBekRDO0lBREMsa0JBQU0sRUFBRTs4QkFDWSwyQkFBbUI7K0RBQUM7QUFHekM7SUFEQyxrQkFBTSxFQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLGtCQUFNLEVBQUU7OytDQUNJO0FBR2I7SUFEQyxrQkFBTSxFQUFFOzhCQUNKLGNBQU87K0NBQUM7QUFPYjtJQURDLGVBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7Ozs7Z0RBR25DO0FBTUQ7SUFEQyxlQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsaUJBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTs7OzttREFFNUI7QUFRRDtJQUZDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2pDLG1CQUFRLEVBQUU7SUFDRSxXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7cUNBQVEsZ0JBQVE7OytDQUVsQztBQU1EO0lBREMsZUFBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUVqQyxXQUFBLGlCQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDYixXQUFBLGlCQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDZCxXQUFBLGlCQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7aURBR2pCO0FBTUQ7SUFEQyxlQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsaUJBQUssRUFBRSxDQUFBOzs7O3NEQUUxQjtBQTFEVSxrQkFBa0I7SUFGOUIsbUJBQU8sRUFBRTtJQUNULHFCQUFjLEVBQUU7R0FDSixrQkFBa0IsQ0EyRDlCO0FBM0RZLGdEQUFrQiJ9