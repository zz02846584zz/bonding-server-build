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
exports.TipEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let TipEntity = class TipEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '標題' }),
    __metadata("design:type", String)
], TipEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ comment: '內容' }),
    __metadata("design:type", String)
], TipEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ comment: '排程日期', nullable: true }),
    __metadata("design:type", String)
], TipEntity.prototype, "publishDate", void 0);
__decorate([
    typeorm_1.Column({ comment: '狀態', default: 'draft' }),
    __metadata("design:type", String)
], TipEntity.prototype, "status", void 0);
TipEntity = __decorate([
    orm_1.EntityModel('tip')
], TipEntity);
exports.TipEntity = TipEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvZW50aXR5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLGlCQUFVO0NBZ0J4QyxDQUFBO0FBZEM7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzt3Q0FDWjtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MENBQ1Y7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUN4QjtBQUlwQjtJQUZDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7eUNBRTdCO0FBWkosU0FBUztJQURyQixpQkFBVyxDQUFDLEtBQUssQ0FBQztHQUNOLFNBQVMsQ0FnQnJCO0FBaEJZLDhCQUFTIn0=