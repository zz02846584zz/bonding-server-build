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
exports.NewsArticleCommentEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let NewsArticleCommentEntity = class NewsArticleCommentEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '文章ID' }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column({ comment: '評論者ID' }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ comment: '內容' }),
    __metadata("design:type", String)
], NewsArticleCommentEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ comment: '評論點讚數', default: 0 }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "likeCount", void 0);
__decorate([
    typeorm_1.Column({ comment: '上層評論ID', nullable: true }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "parentId", void 0);
__decorate([
    typeorm_1.Column({ comment: '評論發表 IP', nullable: true }),
    __metadata("design:type", String)
], NewsArticleCommentEntity.prototype, "publishIp", void 0);
__decorate([
    typeorm_1.Column({ comment: '已刪除 0 否 1 是', default: 0 }),
    __metadata("design:type", Boolean)
], NewsArticleCommentEntity.prototype, "isDelete", void 0);
NewsArticleCommentEntity = __decorate([
    orm_1.EntityModel('news_article_comment')
], NewsArticleCommentEntity);
exports.NewsArticleCommentEntity = NewsArticleCommentEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLGlCQUFVO0NBcUJ2RCxDQUFBO0FBbkJDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MkRBQ1Y7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOzt3REFDZDtBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eURBQ1Y7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzJEQUN2QjtBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MERBQzdCO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsyREFDN0I7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7OzBEQUM3QjtBQXBCUCx3QkFBd0I7SUFEcEMsaUJBQVcsQ0FBQyxzQkFBc0IsQ0FBQztHQUN2Qix3QkFBd0IsQ0FxQnBDO0FBckJZLDREQUF3QiJ9