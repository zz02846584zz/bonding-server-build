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
exports.UserCollectionApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const collection_1 = require("../entity/collection");
const article_1 = require("../../news/entity/article");
const entity_1 = require("../../tip/entity");
const _ = require("lodash");
const COLLECTION_TYPE = {
    article: 'newsArticleEntity',
    tip: 'tipEntity',
};
/**
 * 描述
 */
let UserCollectionApiService = class UserCollectionApiService extends core_1.BaseService {
    /*
     *
     * 分頁內容
     */
    async page(query) {
        const { keyWord, type } = query;
        if (!type)
            throw new core_1.CoolValidateException('必須輸入類型');
        if (Object.keys(COLLECTION_TYPE).indexOf(type) < 0) {
            throw new core_1.CoolValidateException('不存在的類型');
        }
        const userId = this.ctx.user.userId;
        const objType = {
            select: {
                article: `b.id,
            b.title,
            b.excerpt,
            b.thumbnail,
            b.publishDate,
            count(c.id) as viewCount,
            b.status`,
                tip: `d.id,
            d.title,
            d.content,
            d.publishDate`,
            },
        };
        const sql = `
        SELECT
            a.createTime,
            ${objType.select[type]}
        FROM
            user_collection a
            LEFT JOIN news_article b ON a.collectionId = b.id AND a.collectionType LIKE 'article'
            LEFT JOIN news_article_view c ON c.articleId = b.id AND a.collectionType LIKE 'article'
            LEFT JOIN tip d ON d.id = a.collectionId AND a.collectionType LIKE 'tip'
        WHERE
            a.collectionType LIKE '${type}'
            ${this.setSql(userId, 'and a.userId = ?', [userId])}
            ${this.setSql(keyWord, 'and (b.title LIKE ? or d.title LIKE ?)', [
            `%${keyWord}%`,
            `%${keyWord}%`,
        ])}
        GROUP BY a.id
        `;
        return await this.sqlRenderPage(sql, query);
    }
    /*
     *
     * 新增
     */
    async add(query) {
        const { collectionType, collectionId } = query;
        const collectionEntity = COLLECTION_TYPE[collectionType];
        const userId = this.ctx.user.userId;
        const targetExist = await this[collectionEntity].findOne({
            id: collectionId,
            status: 'publish',
        });
        if (_.isEmpty(targetExist)) {
            throw new core_1.CoolCommException('目標不存在');
        }
        const exist = await this.userCollectionEntity.findOne({
            userId,
            collectionType,
            collectionId,
        });
        if (!_.isEmpty(exist))
            throw new core_1.CoolCommException('已加入收藏');
        const { id } = await this.userCollectionEntity.save({
            userId,
            collectionType,
            collectionId,
        });
        return { id };
    }
    /**
     * 刪除
     * @param query
     */
    async delete(ids) {
        if (!ids)
            throw new core_1.CoolCommException('操作失敗');
        const userId = this.ctx.user.userId;
        if (!userId)
            throw new core_1.CoolCommException('用戶未登入');
        const exist = await this.userCollectionEntity.findOne({
            id: ids,
            userId,
        });
        if (_.isEmpty(exist))
            throw new core_1.CoolCommException('操作失敗，目標不存在');
        await this.userCollectionEntity.delete({
            id: ids,
        });
    }
};
__decorate([
    orm_1.InjectEntityModel(collection_1.UserCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserCollectionApiService.prototype, "userCollectionEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserCollectionApiService.prototype, "newsArticleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(entity_1.TipEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserCollectionApiService.prototype, "tipEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], UserCollectionApiService.prototype, "ctx", void 0);
UserCollectionApiService = __decorate([
    decorator_1.Provide()
], UserCollectionApiService);
exports.UserCollectionApiService = UserCollectionApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9jYXNlL2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29sbGVjdGlvbi9zZXJ2aWNlL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBSTJCO0FBQzNCLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMscURBQTREO0FBQzVELHVEQUE4RDtBQUM5RCw2Q0FBNkM7QUFFN0MsNEJBQTRCO0FBRTVCLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLE9BQU8sRUFBRSxtQkFBbUI7SUFDNUIsR0FBRyxFQUFFLFdBQVc7Q0FDakIsQ0FBQztBQUVGOztHQUVHO0FBRUgsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxrQkFBVztJQWF2RDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU0sSUFBSSw0QkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNsRCxNQUFNLElBQUksNEJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFcEMsTUFBTSxPQUFPLEdBQUc7WUFDZCxNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFOzs7Ozs7cUJBTUk7Z0JBQ2IsR0FBRyxFQUFFOzs7MEJBR2E7YUFDbkI7U0FDRixDQUFDO1FBQ0YsTUFBTSxHQUFHLEdBQUc7OztjQUdGLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFB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