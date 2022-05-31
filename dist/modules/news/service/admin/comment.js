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
exports.NewsCommentAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
/**
 * 描述
 */
let NewsCommentAdminService = class NewsCommentAdminService extends core_1.BaseService {
    /**
     * 分頁查詢
     * @param query
     */
    async page(query) {
        const { articleId } = query;
        const sql = `
        SELECT
            b.*
        FROM
            news_article a
            LEFT JOIN news_article_comment b ON a.id = b.articleId
        WHERE a.articleId=${articleId}
        GROUP BY a.id
    `;
        const result = await this.sqlRenderPage(sql, query);
        return result;
    }
    /**
     * 列表查詢
     * @param param
     */
    async list(param) {
        const { articleId } = param;
        if (!articleId)
            throw new core_1.CoolCommException('操作失敗');
        const sql = `
        SELECT
            a.id
        FROM
            news_article_comment a
        WHERE a.articleId=${articleId}
        GROUP BY a.id
    `;
        const result = await this.nativeQuery(sql);
        return result;
    }
};
__decorate([
    orm_1.InjectEntityModel(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsCommentAdminService.prototype, "newsArticleCommentEntity", void 0);
NewsCommentAdminService = __decorate([
    decorator_1.Provide()
], NewsCommentAdminService);
exports.NewsCommentAdminService = NewsCommentAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9jb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBZ0U7QUFFaEU7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGtCQUFXO0lBSXREOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNkLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs0QkFNWSxTQUFTOztLQUVoQyxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUU1QixJQUFJLENBQUMsU0FBUztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRCxNQUFNLEdBQUcsR0FBRzs7Ozs7NEJBS1ksU0FBUzs7S0FFaEMsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQTtBQTVDQztJQURDLHVCQUFpQixDQUFDLGtDQUF3QixDQUFDOzhCQUNsQixvQkFBVTt5RUFBMkI7QUFGcEQsdUJBQXVCO0lBRG5DLG1CQUFPLEVBQUU7R0FDRyx1QkFBdUIsQ0E4Q25DO0FBOUNZLDBEQUF1QiJ9