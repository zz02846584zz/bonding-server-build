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
exports.SpaceInfoEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 文件空间信息
 */
let SpaceInfoEntity = class SpaceInfoEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '地址' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ comment: '类型' }),
    __metadata("design:type", String)
], SpaceInfoEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '分类ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], SpaceInfoEntity.prototype, "classifyId", void 0);
SpaceInfoEntity = __decorate([
    orm_1.EntityModel('space_info')
], SpaceInfoEntity);
exports.SpaceInfoEntity = SpaceInfoEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3NwYWNlL2VudGl0eS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxpQkFBVTtDQVM5QyxDQUFBO0FBUEM7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDZDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQ2I7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDekM7QUFSUixlQUFlO0lBRDNCLGlCQUFXLENBQUMsWUFBWSxDQUFDO0dBQ2IsZUFBZSxDQVMzQjtBQVRZLDBDQUFlIn0=