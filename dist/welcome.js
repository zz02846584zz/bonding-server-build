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
exports.WelcomeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 欢迎界面
 */
let WelcomeController = class WelcomeController {
    async welcome() {
        await this.ctx.render('welcome', {
            text: '',
        });
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], WelcomeController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "welcome", null);
WelcomeController = __decorate([
    decorator_1.Controller('/')
], WelcomeController);
exports.WelcomeController = WelcomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJ3ZWxjb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUc5RDs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBS3JCLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQy9CLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFSQztJQURDLGtCQUFNLEVBQUU7OzhDQUNJO0FBR2I7SUFEQyxlQUFHLENBQUMsR0FBRyxDQUFDOzs7O2dEQUtSO0FBVFUsaUJBQWlCO0lBRDdCLHNCQUFVLENBQUMsR0FBRyxDQUFDO0dBQ0gsaUJBQWlCLENBVTdCO0FBVlksOENBQWlCIn0=