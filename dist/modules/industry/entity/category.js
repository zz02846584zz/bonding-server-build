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
exports.IndustryCategoryEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let IndustryCategoryEntity = class IndustryCategoryEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '分類名稱' }),
    __metadata("design:type", String)
], IndustryCategoryEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ comment: '分類代稱' }),
    __metadata("design:type", String)
], IndustryCategoryEntity.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ comment: '分類描述', nullable: true }),
    __metadata("design:type", String)
], IndustryCategoryEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ comment: '上層分類', nullable: true }),
    __metadata("design:type", Number)
], IndustryCategoryEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ comment: 'Icon', nullable: true }),
    __metadata("design:type", String)
], IndustryCategoryEntity.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column({ comment: '排序號', nullable: true }),
    __metadata("design:type", Number)
], IndustryCategoryEntity.prototype, "orderNum", void 0);
IndustryCategoryEntity = __decorate([
    orm_1.EntityModel('industry_category')
], IndustryCategoryEntity);
exports.IndustryCategoryEntity = IndustryCategoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9lbnRpdHkvY2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGlCQUFVO0NBdUJyRCxDQUFBO0FBckJDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7b0RBQ2Y7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O29EQUNmO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJEQUN4QjtBQUdwQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0RBQzNCO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDL0I7QUFHYjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0RBQzFCO0FBakJOLHNCQUFzQjtJQURsQyxpQkFBVyxDQUFDLG1CQUFtQixDQUFDO0dBQ3BCLHNCQUFzQixDQXVCbEM7QUF2Qlksd0RBQXNCIn0=