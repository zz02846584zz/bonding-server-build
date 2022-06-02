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
exports.NewsCommentApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
const article_1 = require("../../entity/article");
const _ = require("lodash");
/**
 * 描述
 */
let NewsCommentApiService = class NewsCommentApiService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { articleId } = query;
        if (!articleId || !_.isNumber(articleId))
            throw new core_1.CoolValidateException('請輸入正確的文章ID');
        const exist = await this.newsArticleEntity.findOne({ id: articleId });
        if (_.isEmpty(exist))
            throw new core_1.CoolValidateException('找不到該文章');
        const sql = `
        SELECT
            a.id,
            a.content,
            a.likeCount,
            a.parentId,
            a.createTime,

            concat(b.firstName, b.lastName) As author
        FROM
            news_article_comment a
            LEFT JOIN base_sys_user b ON a.userId = b.id
        WHERE 1 = 1
            and a.isDelete = 0
            and a.articleId = ${articleId}
            and a.parentId IS NULL
        GROUP BY a.id
        `;
        const data = await this.sqlRenderPage(sql, query);
        await this.detectChild(data.list);
        return data;
    }
    async detectChild(list) {
        const fn = async (param) => {
            return new Promise((resolve, reject) => {
                resolve(this.newsArticleCommentEntity.findOne({ parentId: param.id }));
            });
        };
        const promises = list.map(fn);
        return Promise.all(promises).then(result => {
            list.forEach((item, index) => {
                item.hasChild = !_.isEmpty(result[index]);
            });
        });
    }
    /**
     * 取得子項目
     * @param query
     */
    async child(param) {
        const { parentId } = param;
        if (!parentId || !_.isNumber(parentId)) {
            throw new core_1.CoolValidateException('請輸入正確的評論ID');
        }
        const result = await this.nativeQuery(`
        SELECT
            a.id,
            a.content,
            a.likeCount,
            a.parentId,
            a.createTime,

            concat(b.firstName, b.lastName) As author
        FROM
            news_article_comment a
            LEFT JOIN base_sys_user b ON a.userId = b.id
        WHERE 1 = 1
            and a.isDelete = 0
            and a.parentId = ${parentId}
        GROUP BY a.id
        `);
        return result;
    }
    /**
     * 新增
     * @param query
     */
    async add(query) {
        const { articleId, content, parentId } = query;
        if (_.isEmpty(content))
            throw new core_1.CoolValidateException('內容不能為空');
        if (_.isEmpty(this.ctx.user))
            throw new core_1.CoolCommException('用戶未登入');
        const userId = this.ctx.user.userId;
        const exist = await this.newsArticleEntity.findOne({ id: articleId });
        if (_.isEmpty(exist))
            throw new core_1.CoolValidateException('找不到該文章');
        const { id } = await this.newsArticleCommentEntity.save({
            articleId,
            content,
            userId,
            parentId,
        });
        return {
            id,
        };
    }
    /**
     * 修改
     * @param query
     */
    async update(query) {
        const { id, content } = query;
        if (_.isEmpty(content))
            throw new core_1.CoolValidateException('內容不能為空');
        if (_.isEmpty(this.ctx.user))
            throw new core_1.CoolCommException('用戶未登入');
        const userId = this.ctx.user.userId;
        const exist = await this.newsArticleCommentEntity.findOne({ id, userId });
        if (_.isEmpty(exist))
            throw new core_1.CoolValidateException('找不到該評論');
        await this.newsArticleCommentEntity.save({
            id,
            content,
        });
    }
    /**
     * 刪除
     * @param ids
     */
    async delete(ids) {
        const deleteIds = [];
        if (!ids)
            throw new core_1.CoolValidateException('請輸入完整的參數');
        if (_.isEmpty(this.ctx.user))
            throw new core_1.CoolCommException('用戶未登入');
        const userId = this.ctx.user.userId;
        const list = await this.nativeQuery(`
      SELECT
          a.id
      FROM
          news_article_comment a
      WHERE
          a.userId=${userId}
          and a.id in (${ids})
      `);
        if (!_.isEmpty(list)) {
            list.forEach(item => {
                deleteIds.push(item.id);
            });
        }
        if (_.isEmpty(deleteIds))
            throw new core_1.CoolCommException('操作失敗');
        await this.newsArticleCommentEntity.delete(deleteIds);
    }
};
__decorate([
    orm_1.InjectEntityModel(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsCommentApiService.prototype, "newsArticleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsCommentApiService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], NewsCommentApiService.prototype, "ctx", void 0);
NewsCommentApiService = __decorate([
    decorator_1.Provide()
], NewsCommentApiService);
exports.NewsCommentApiService = NewsCommentApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hcGkvY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBSTJCO0FBQzNCLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsa0RBQWdFO0FBQ2hFLGtEQUF5RDtBQUV6RCw0QkFBNEI7QUFFNUI7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBVXBEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNkLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSw0QkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsTUFBTSxJQUFJLDRCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7OztnQ0FjZ0IsU0FBUzs7O1NBR2hDLENBQUM7UUFDTixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFD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