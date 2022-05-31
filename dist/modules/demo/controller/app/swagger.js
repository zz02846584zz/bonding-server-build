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
exports.AppSwaggerController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * swagger 文档
 */
let AppSwaggerController = class AppSwaggerController extends core_1.BaseController {
    async create(id) {
        return this.ok(id);
    }
};
__decorate([
    decorator_1.Post('/create', { summary: '创建' }),
    __param(0, decorator_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppSwaggerController.prototype, "create", null);
AppSwaggerController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController(null, {
        tagName: 'swagger demo',
    })
], AppSwaggerController);
exports.AppSwaggerController = AppSwaggerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvc3dhZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFDM0QsNENBQW1FO0FBRW5FOztHQUVHO0FBS0gsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxxQkFBYztJQUV0RCxLQUFLLENBQUMsTUFBTSxDQUFjLEVBQVU7UUFDbEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxnQkFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGlCQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7a0RBRXhCO0FBSlUsb0JBQW9CO0lBSmhDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDLElBQUksRUFBRTtRQUNwQixPQUFPLEVBQUUsY0FBYztLQUN4QixDQUFDO0dBQ1csb0JBQW9CLENBS2hDO0FBTFksb0RBQW9CIn0=