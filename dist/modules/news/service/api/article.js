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
exports.NewsArticleApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const article_1 = require("../../entity/article");
const _ = require("lodash");
const comment_1 = require("../../entity/comment");
const category_1 = require("../../entity/category");
const like_1 = require("../../entity/like");
const view_1 = require("../../entity/view");
const ARTICLE_STATUS = 'publish';
/**
 * 描述
 */
let NewsArticleApiService = class NewsArticleApiService extends core_1.BaseService {
    /**
     * 取得內容
     * @param query
     */
    async info(query) {
        var _a;
        const { slug } = query;
        const info = await this.newsArticleEntity.findOne({ slug });
        if (_.isEmpty(info)) {
            throw new core_1.CoolValidateException('文章不存在');
        }
        const categoryList = await this.newsArticleCategoryEntity.find({
            articleId: info.id,
        });
        const isLogin = !_.isEmpty(this.ctx.user);
        if (!isLogin) {
            info.content = ((_a = info.excerpt) === null || _a === void 0 ? void 0 : _a.length)
                ? info.excerpt
                : info.content.replace(/<[^>]+>/gi, '').substr(0, 80);
        }
        await this.articleView(info.id);
        return { ...info, categoryList };
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord, type, order = 'publishDate', sort = 'desc', categoryId, } = query;
        const sql = `
        SELECT
            a.id,
            a.title,
            a.content,
            a.excerpt,
            a.thumbnail,
            a.publishDate,
            a.commentStatus,
            a.isSticky,
            a.isEssence,
            a.type,
            a.videoUrl,
            a.status,
            a.slug,

            concat(c.firstName, ' ', c.lastName) As author,
            GROUP_CONCAT(d.name) As categoryName
        FROM
            news_article a
            LEFT JOIN news_article_category b ON a.id = b.articleId
            LEFT JOIN base_sys_user c ON a.userId = c.id
            LEFT JOIN industry_category d ON d.id = b.categoryId
        WHERE a.status LIKE '${ARTICLE_STATUS}'
            ${this.setSql(!_.isEmpty(type), 'and a.type = (?)', type)}
            ${this.setSql(categoryId, 'and d.id = (?)', categoryId)}
            ${this.setSql(keyWord, "and (a.title LIKE ? or concat(c.firstName, '', c.lastName) LIKE ?)", [`%${keyWord}%`, `%${keyWord}%`])}
        GROUP BY a.id
        `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order,
            sort,
        }));
        result.list.forEach(item => {
            var _a;
            if (!((_a = item.excerpt) === null || _a === void 0 ? void 0 : _a.length)) {
                item.excerpt = item.content.replace(/<[^>]+>/gi, '').substr(0, 80);
                delete item.content;
            }
        });
        return result;
    }
    /**
     * 列表查询
     * @param query
     */
    async list() {
        const result = await this.nativeQuery(`
        SELECT
          createTime,
          title,
          excerpt,
          publishDate
        FROM
            news_article
        where 1=1
      `);
        return result;
    }
    /**
     * 取得分類
     * @param query
     */
    async categoryList() {
        var _a;
        const category = await this.nativeQuery(`
        SELECT
          group_concat(distinct a.categoryId) as ids
        FROM
          news_article_category a
        WHERE 1=1
      `);
        const categoryIds = ((_a = category[0]) === null || _a === void 0 ? void 0 : _a.ids) || 0;
        const result = await this.nativeQuery(`
        SELECT
          a.id,
          a.name,
          a.slug
        FROM
          industry_category a
        WHERE
          a.id in (${categoryIds})
      `);
        return result;
    }
    /**
     * 關聯評論
     * @param ids
     */
    async getCommentByArticle(article) {
        return await this.newsArticleCommentEntity.find({ articleId: article.id });
    }
    /**
     * 按讚
     * @param param
     */
    async articleLike({ id }) {
        if (!id)
            throw new core_1.CoolValidateException('請輸入完整的參數');
        if (!_.isEmpty(this.ctx.user)) {
            const exist = await this.newsArticleLikeEntity.findOne({
                articleId: id,
                userId: this.ctx.user.userId,
            });
            if (_.isEmpty(exist)) {
                await this.newsArticleLikeEntity.save({
                    articleId: id,
                    userId: this.ctx.user.userId,
                });
            }
            else {
                await this.newsArticleLikeEntity.delete({
                    articleId: id,
                    userId: this.ctx.user.userId,
                });
            }
        }
        else {
            throw new core_1.CoolCommException('請登入會員');
        }
    }
    /**
     * 按讚
     * @param param
     */
    async articleView(id) {
        if (!_.isEmpty(this.ctx.user)) {
            const exist = await this.newsArticleViewEntity.findOne({
                articleId: id,
                userId: this.ctx.user.userId,
            });
            if (_.isEmpty(exist)) {
                await this.newsArticleViewEntity.save({
                    articleId: id,
                    userId: this.ctx.user.userId,
                });
            }
        }
        else {
            const exist = await this.newsArticleViewEntity.findOne({
                articleId: id,
                userId: 0,
            });
            if (_.isEmpty(exist)) {
                await this.newsArticleViewEntity.save({
                    articleId: id,
                    userId: 0,
                });
            }
            else {
                await this.newsArticleViewEntity.save({
                    id: exist.id,
                    articleId: id,
                    userId: 0,
                    count: exist.count + 1,
                });
            }
        }
    }
};
__decorate([
    orm_1.InjectEntityModel(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(category_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleCategoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(like_1.NewsArticleLikeEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleLikeEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(view_1.NewsArticleViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleViewEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], NewsArticleApiService.prototype, "ctx", void 0);
NewsArticleApiService = __decorate([
    decorator_1.Provide()
], NewsArticleApiService);
exports.NewsArticleApiService = NewsArticleApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hcGkvYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBSTJCO0FBQzNCLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsa0RBQXlEO0FBRXpELDRCQUE0QjtBQUM1QixrREFBZ0U7QUFDaEUsb0RBQWtFO0FBQ2xFLDRDQUEwRDtBQUMxRCw0Q0FBMEQ7QUFFMUQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxrQkFBVztJQW1CcEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLOztRQUNkLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbkIsTUFBTSxJQUFJLDRCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO1lBQzdELFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNuQixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFBLE1BQUEs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