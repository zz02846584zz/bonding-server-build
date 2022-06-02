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
exports.NewsArticleCategoryEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let NewsArticleCategoryEntity = class NewsArticleCategoryEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '文章id' }),
    __metadata("design:type", Number)
], NewsArticleCategoryEntity.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column({ comment: '分類id' }),
    __metadata("design:type", Number)
], NewsArticleCategoryEntity.prototype, "categoryId", void 0);
NewsArticleCategoryEntity = __decorate([
    orm_1.EntityModel('news_article_category')
], NewsArticleCategoryEntity);
exports.NewsArticleCategoryEntity = NewsArticleCategoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9uZXdzL2VudGl0eS9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsaUJBQVU7Q0FNeEQsQ0FBQTtBQUpDO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NERBQ1Y7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs2REFDVDtBQUxSLHlCQUF5QjtJQURyQyxpQkFBVyxDQUFDLHVCQUF1QixDQUFDO0dBQ3hCLHlCQUF5QixDQU1yQztBQU5ZLDhEQUF5QiJ9