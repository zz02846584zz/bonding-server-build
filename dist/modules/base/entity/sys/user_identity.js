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
exports.BaseUserIdentityEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let BaseUserIdentityEntity = class BaseUserIdentityEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '用戶ID' }),
    __metadata("design:type", Number)
], BaseUserIdentityEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ comment: '正面' }),
    __metadata("design:type", String)
], BaseUserIdentityEntity.prototype, "positive", void 0);
__decorate([
    typeorm_1.Column({ comment: '背面' }),
    __metadata("design:type", String)
], BaseUserIdentityEntity.prototype, "negative", void 0);
BaseUserIdentityEntity = __decorate([
    orm_1.EntityModel('base_sys_user_identity')
], BaseUserIdentityEntity);
exports.BaseUserIdentityEntity = BaseUserIdentityEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pZGVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy91c2VyX2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxpQkFBVTtDQVNyRCxDQUFBO0FBUEM7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztzREFDYjtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0RBQ1Q7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzt3REFDVDtBQVJOLHNCQUFzQjtJQURsQyxpQkFBVyxDQUFDLHdCQUF3QixDQUFDO0dBQ3pCLHNCQUFzQixDQVNsQztBQVRZLHdEQUFzQiJ9