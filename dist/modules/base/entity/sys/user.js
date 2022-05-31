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
exports.BaseSysUserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系統用戶
 */
let BaseSysUserEntity = class BaseSysUserEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '部門ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "departmentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '姓' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ comment: '名' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ comment: '用戶名', length: 100 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ comment: '生日', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column({ comment: '身分證', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "id_card", void 0);
__decorate([
    typeorm_1.Column({ comment: '手機', nullable: true, length: 20 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ comment: '密碼' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        comment: '密碼版本, 作用是改完密碼，讓原來的token失效',
        default: 1,
    }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "passwordV", void 0);
__decorate([
    typeorm_1.Column({ comment: '頭像', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "headImg", void 0);
__decorate([
    typeorm_1.Column({ comment: 'Email', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ comment: '性別 0 男 1 女 2 跨性別', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({ comment: '備注', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "remark", void 0);
__decorate([
    typeorm_1.Column({ comment: '簡介', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "intro", void 0);
__decorate([
    typeorm_1.Column({ comment: '狀態 0 正常 1 停權 2 刪除', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        comment: '身份驗證狀態 0 未驗證 1 審核中 2 駁回 3 通過',
        default: 0,
        type: 'tinyint',
    }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "verify", void 0);
__decorate([
    typeorm_1.Column({ comment: 'socketId', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "socketId", void 0);
BaseSysUserEntity = __decorate([
    orm_1.EntityModel('base_sys_user')
], BaseSysUserEntity);
exports.BaseSysUserEntity = BaseSysUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQXdDO0FBRXhDOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQWlFaEQsQ0FBQTtBQTlEQztJQUZDLGVBQUssRUFBRTtJQUNQLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt1REFDdkM7QUFHckI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOztvREFDUDtBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7O21EQUNSO0FBSWpCO0lBRkMsZUFBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7bURBQ3ZCO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDekI7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUMzQjtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOztnREFDeEM7QUFHZDtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUNUO0FBTWpCO0lBSkMsZ0JBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDOztvREFDZ0I7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUMxQjtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQy9CO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOztpREFDdEQ7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQzNCO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUM1QjtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7aURBQ3ZEO0FBT2Y7SUFMQyxnQkFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLDhCQUE4QjtRQUN2QyxPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUM7O2lEQUNhO0FBUWY7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUMvQjtBQWhFTixpQkFBaUI7SUFEN0IsaUJBQVcsQ0FBQyxlQUFlLENBQUM7R0FDaEIsaUJBQWlCLENBaUU3QjtBQWpFWSw4Q0FBaUIifQ==