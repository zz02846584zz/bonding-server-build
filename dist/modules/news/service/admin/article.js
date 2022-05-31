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
exports.NewsArticleAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const article_1 = require("../../entity/article");
const comment_1 = require("../../entity/comment");
const category_1 = require("../../entity/category");
const _ = require("lodash");
const category_2 = require("../../../industry/entity/category");
/**
 * 描述
 */
let NewsArticleAdminService = class NewsArticleAdminService extends core_1.BaseService {
    /**
     * 取得內容
     * @param query
     */
    async info(id) {
        var _a;
        const info = await this.newsArticleEntity.findOne({ id });
        const categoryList = await this.getCategoryByArticleId(info);
        const categoryId = (_a = categoryList === null || categoryList === void 0 ? void 0 : categoryList.map(item => item.id)) === null || _a === void 0 ? void 0 : _a.pop();
        return {
            ...info,
            categoryId,
        };
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const sql = `
        SELECT
            a.*,

            GROUP_CONCAT(d.name) AS categoryName,
            concat(b.firstName, b.lastName) As author
        FROM
            news_article a
            LEFT JOIN base_sys_user b ON a.userId = b.id
            LEFT JOIN news_article_category c ON a.id = c.articleId
            LEFT JOIN industry_category d ON d.id = c.categoryId
        WHERE 1 = 1
        GROUP BY a.id
        `;
        const result = await this.sqlRenderPage(sql, query);
        return result;
    }
    /**
     * 列表查询
     * @param query
     */
    async list() {
        const result = await this.nativeQuery(`
        SELECT
            *
        FROM
            news_article
        where 1=1
      `);
        return result;
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        const exists = await this.newsArticleEntity.findOne({
            slug: param.slug,
        });
        if (!_.isEmpty(exists)) {
            throw new core_1.CoolCommException('該代稱已被使用');
        }
        const { status } = param;
        if (status === 'publish' && !param.publishDate) {
            param.publishDate = this.getToday();
        }
        else if (status === 'draft' || status === 'disallow') {
            param.publishDate = null;
        }
        await this.newsArticleEntity.save(param);
        await this.updateArticleCategory(param);
        return param.id;
    }
    /**
     * 新增
     * @param param
     */
    async update(param) {
        const { status } = param;
        if (status === 'publish' && !param.publishDate) {
            param.publishDate = this.getToday();
        }
        else if (status === 'draft' || status === 'disallow') {
            param.publishDate = null;
        }
        await this.newsArticleEntity.save(param);
        await this.updateArticleCategory(param);
        return param.id;
    }
    getToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }
    /**
     * 刪除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            await this.newsArticleEntity.delete({ id });
            await this.delChildCat(id);
        }
    }
    /**
     * 删除子菜单
     * @param id
     */
    async delChildCat(id) {
        const delCat = await this.newsArticleCategoryEntity.find({ articleId: id });
        if (_.isEmpty(delCat)) {
            return;
        }
        const delCatIds = delCat.map(e => {
            return e.id;
        });
        await this.newsArticleCategoryEntity.delete(delCatIds);
        for (const catId of delCatIds) {
            await this.delChildCat(catId);
        }
    }
    /**
     * 關聯評論
     * @param ids
     */
    async getCommentByArticleId({ articleId, parent = false }) {
        if (!articleId)
            throw new core_1.CoolCommException('操作失敗');
        const result = this.nativeQuery(`
      SELECT
        a.*,
        
        concat(b.firstName, b.lastName) as name
      FROM
        news_article_comment a
        LEFT JOIN base_sys_user b ON a.userId = b.id
      WHERE 1=1
        and a.articleId=${articleId}
        ${this.setSql(parent, 'and a.parentId IS NULL', parent)}
    `);
        return result;
    }
    /**
     * 關聯分類
     * @param ids
     */
    async getCategoryByArticleId(article) {
        const result = await this.nativeQuery(`
        SELECT
            b.id,
            b.name,
            b.parentId,
            b.slug
        FROM
            news_article_category a
            LEFT JOIN industry_category b ON a.categoryId = b.id
        where a.articleId=${article.id}
        GROUP BY a.id
      `);
        return result;
    }
    /**
     * 更新小知識分類關係
     * @param tip
     */
    async updateArticleCategory(article) {
        await this.newsArticleCategoryEntity.delete({
            articleId: article.id,
        });
        if (article.categoryId) {
            const exist = await this.industryCategoryEntity.findOne({
                id: article.categoryId,
            });
            if (_.isEmpty(exist))
                throw new core_1.CoolCommException('操作失敗');
            if (exist.parentId !== null) {
                await this.newsArticleCategoryEntity.save({
                    articleId: article.id,
                    categoryId: exist.parentId,
                });
            }
            await this.newsArticleCategoryEntity.save({
                articleId: article.id,
                categoryId: exist.id,
            });
        }
    }
};
__decorate([
    orm_1.InjectEntityModel(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(category_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleCategoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(category_2.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "industryCategoryEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], NewsArticleAdminService.prototype, "ctx", void 0);
NewsArticleAdminService = __decorate([
    decorator_1.Provide()
], NewsArticleAdminService);
exports.NewsArticleAdminService = NewsArticleAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBeUQ7QUFDekQsa0RBQWdFO0FBQ2hFLG9EQUFrRTtBQUVsRSw0QkFBNEI7QUFDNUIsZ0VBQTJFO0FBQzNFOztHQUVHO0FBRUgsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxrQkFBVztJQWdCdEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFOztRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTSxVQUFVLEdBQUcsTUFBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxHQUFHLEVBQUUsQ0FBQztRQUM3RCxPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsVUFBVTtTQUNYLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7U0FhUCxDQUFDO1FBQ04sTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwRCxPQUFPLE1BQU0sQ0FBQztJQUNo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