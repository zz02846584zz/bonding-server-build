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
exports.BaseSysRoleEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 角色
 */
let BaseSysRoleEntity = class BaseSysRoleEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '用户ID' }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '名称' }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '角色标签', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "label", void 0);
__decorate([
    typeorm_1.Column({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysRoleEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ comment: '数据权限是否关联上下级', default: 1 }),
    __metadata("design:type", Number)
], BaseSysRoleEntity.prototype, "relevance", void 0);
BaseSysRoleEntity = __decorate([
    orm_1.EntityModel('base_sys_role')
], BaseSysRoleEntity);
exports.BaseSysRoleEntity = BaseSysRoleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQXdDO0FBRXhDOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQWlCaEQsQ0FBQTtBQWZDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7aURBQ2I7QUFJZjtJQUZDLGVBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDYjtBQUliO0lBRkMsZUFBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOztnREFDMUM7QUFHZDtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQzNCO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O29EQUM3QjtBQWhCUCxpQkFBaUI7SUFEN0IsaUJBQVcsQ0FBQyxlQUFlLENBQUM7R0FDaEIsaUJBQWlCLENBaUI3QjtBQWpCWSw4Q0FBaUIifQ==