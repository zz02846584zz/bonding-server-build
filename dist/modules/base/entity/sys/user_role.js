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
exports.BaseSysUserRoleEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 用户角色
 */
let BaseSysUserRoleEntity = class BaseSysUserRoleEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '用户ID', type: 'bigint' }),
    __metadata("design:type", Number)
], BaseSysUserRoleEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ comment: '角色ID', type: 'bigint' }),
    __metadata("design:type", Number)
], BaseSysUserRoleEntity.prototype, "roleId", void 0);
BaseSysUserRoleEntity = __decorate([
    orm_1.EntityModel('base_sys_user_role')
], BaseSysUserRoleEntity);
exports.BaseSysUserRoleEntity = BaseSysUserRoleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9yb2xlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL3VzZXJfcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsaUJBQVU7Q0FNcEQsQ0FBQTtBQUpDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOztxREFDN0I7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7cURBQzdCO0FBTEoscUJBQXFCO0lBRGpDLGlCQUFXLENBQUMsb0JBQW9CLENBQUM7R0FDckIscUJBQXFCLENBTWpDO0FBTlksc0RBQXFCIn0=