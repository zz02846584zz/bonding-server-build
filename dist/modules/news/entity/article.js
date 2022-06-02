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
exports.NewsArticleEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let NewsArticleEntity = class NewsArticleEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '發布者 ID' }),
    __metadata("design:type", Number)
], NewsArticleEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ comment: '標題' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ comment: '代稱', unique: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ comment: '內容', type: 'longtext' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ comment: '摘錄', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "excerpt", void 0);
__decorate([
    typeorm_1.Column({ comment: '縮圖', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column({ comment: '發布日期', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "publishDate", void 0);
__decorate([
    typeorm_1.Column({ comment: '閱讀數量', default: 0 }),
    __metadata("design:type", Number)
], NewsArticleEntity.prototype, "viewCount", void 0);
__decorate([
    typeorm_1.Column({ comment: '開啟評論 0 關閉 1 開啟', default: 1 }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "commentStatus", void 0);
__decorate([
    typeorm_1.Column({ comment: '是否置頂 0 關閉 1 開啟', default: 0 }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "isSticky", void 0);
__decorate([
    typeorm_1.Column({ comment: '精華文章 0 否 1 是', default: 0 }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "isEssence", void 0);
__decorate([
    typeorm_1.Column({ comment: '類型 text video', default: 'text' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({ comment: '影片連結', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "videoUrl", void 0);
__decorate([
    typeorm_1.Column({ comment: '軟刪除 0 否 1 是', default: false }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "isDelete", void 0);
__decorate([
    typeorm_1.Column({ comment: '文章狀態' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "status", void 0);
NewsArticleEntity = __decorate([
    orm_1.EntityModel('news_article')
], NewsArticleEntity);
exports.NewsArticleEntity = NewsArticleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGlCQUFVO0NBbURoRCxDQUFBO0FBakRDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs7aURBQ2Y7QUFHZjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUNaO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUMzQjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDOztrREFDNUI7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUMxQjtBQUdoQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQ3hCO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzREFDeEI7QUFHcEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O29EQUN0QjtBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzt3REFDM0I7QUFHdkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7bURBQ2hDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOztvREFDN0I7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7OytDQUN6QztBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDM0I7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O21EQUNqQztBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O2lEQUNiO0FBNUNKLGlCQUFpQjtJQUQ3QixpQkFBVyxDQUFDLGNBQWMsQ0FBQztHQUNmLGlCQUFpQixDQW1EN0I7QUFuRFksOENBQWlCIn0=