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
exports.NewsArticleLikeEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let NewsArticleLikeEntity = class NewsArticleLikeEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '文章ID' }),
    __metadata("design:type", Number)
], NewsArticleLikeEntity.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column({ comment: '用戶ID' }),
    __metadata("design:type", Number)
], NewsArticleLikeEntity.prototype, "userId", void 0);
NewsArticleLikeEntity = __decorate([
    orm_1.EntityModel('news_article_like')
], NewsArticleLikeEntity);
exports.NewsArticleLikeEntity = NewsArticleLikeEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlrZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2xpa2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGlCQUFVO0NBTXBELENBQUE7QUFKQztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3dEQUNWO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7cURBQ2I7QUFMSixxQkFBcUI7SUFEakMsaUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQztHQUNwQixxQkFBcUIsQ0FNakM7QUFOWSxzREFBcUIifQ==