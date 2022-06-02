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
exports.ApiResetPasswordDTO = exports.ApiForgotDTO = exports.ApiCaptchaDTO = exports.ApiRegisterDTO = exports.ApiLoginDTO = void 0;
const validate_1 = require("@midwayjs/validate");
/**
 * 登錄參數校驗
 */
class ApiLoginDTO {
}
__decorate([
    validate_1.Rule(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "area", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "phone", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "password", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.boolean()),
    __metadata("design:type", Boolean)
], ApiLoginDTO.prototype, "rememberMe", void 0);
exports.ApiLoginDTO = ApiLoginDTO;
class ApiRegisterDTO {
}
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "firstName", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "lastName", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "area", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "phone", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "password", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "passwordConfirm", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.required()),
    __metadata("design:type", Number)
], ApiRegisterDTO.prototype, "verifyCode", void 0);
exports.ApiRegisterDTO = ApiRegisterDTO;
class ApiCaptchaDTO {
}
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiCaptchaDTO.prototype, "area", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiCaptchaDTO.prototype, "phone", void 0);
exports.ApiCaptchaDTO = ApiCaptchaDTO;
class ApiForgotDTO {
}
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "area", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "phone", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "verifyCode", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "password", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "passwordConfirm", void 0);
exports.ApiForgotDTO = ApiForgotDTO;
class ApiResetPasswordDTO {
}
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "oldPassword", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "newPasswordConfirm", void 0);
__decorate([
    validate_1.Rule(validate_1.RuleType.number()),
    __metadata("design:type", Number)
], ApiResetPasswordDTO.prototype, "passwordV", void 0);
exports.ApiResetPasswordDTO = ApiResetPasswordDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZHRvL2FwcC9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUNwRDs7R0FFRztBQUNILE1BQWEsV0FBVztDQWdCdkI7QUFiQztJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOzt5Q0FDWDtBQUliO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzBDQUNyQjtBQUlkO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzZDQUNsQjtBQUlqQjtJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzsrQ0FDTDtBQWZ0QixrQ0FnQkM7QUFFRCxNQUFhLGNBQWM7Q0E0QjFCO0FBekJDO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2lEQUNqQjtBQUlsQjtJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztnREFDbEI7QUFJakI7SUFEQyxlQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7NENBQ3RCO0FBSWI7SUFEQyxlQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7NkNBQ3JCO0FBSWQ7SUFEQyxlQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Z0RBQ2xCO0FBSWpCO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3VEQUNYO0FBSXhCO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7O2tEQUNQO0FBM0JyQix3Q0E0QkM7QUFFRCxNQUFhLGFBQWE7Q0FRekI7QUFMQztJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzsyQ0FDdEI7QUFJYjtJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs0Q0FDckI7QUFQaEIsc0NBUUM7QUFFRCxNQUFhLFlBQVk7Q0FvQnhCO0FBakJDO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzBDQUN0QjtBQUliO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzJDQUNyQjtBQUlkO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2dEQUNoQjtBQUluQjtJQURDLGVBQUksQ0FBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs4Q0FDbEI7QUFJakI7SUFEQyxlQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7cURBQ1g7QUFuQjFCLG9DQW9CQztBQUVELE1BQWEsbUJBQW1CO0NBZ0IvQjtBQWJDO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3dEQUNmO0FBSXBCO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3dEQUNmO0FBSXBCO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OytEQUNSO0FBSTNCO0lBREMsZUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7O3NEQUNOO0FBZnBCLGtEQWdCQyJ9