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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsArticleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const article_1 = require("../../entity/article");
const article_2 = require("../../service/api/article");
/**
 * 描述
 */
let NewsArticleController = class NewsArticleController extends core_1.BaseController {
    /**
     * 分類
     * @param param
     */
    async getArticleCategory() {
        return this.ok(await this.newsArticleApiService.categoryList());
    }
    /**
     * 分類
     * @param param
     */
    async getArticle(param) {
        return this.ok(await this.newsArticleApiService.info(param));
    }
    /**
     * 分類
     * @param param
     */
    async articleLike(param) {
        return this.ok(await this.newsArticleApiService.articleLike(param));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", article_2.NewsArticleApiService)
], NewsArticleController.prototype, "newsArticleApiService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], NewsArticleController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Get('/categoryList', { summary: '取得留言' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getArticleCategory", null);
__decorate([
    decorator_1.Get('/info', { summary: '文章內容' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getArticle", null);
__decorate([
    decorator_1.Post('/like', { summary: '點贊' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "articleLike", null);
NewsArticleController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        prefix: '/api/news/article',
        api: ['list', 'page'],
        entity: article_1.NewsArticleEntity,
        service: article_2.NewsArticleApiService,
    })
], NewsArticleController);
exports.NewsArticleController = NewsArticleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvY29udHJvbGxlci9hcHAvYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBdUU7QUFDdkUsNENBQW1FO0FBQ25FLGtEQUF5RDtBQUN6RCx1REFBa0U7QUFHbEU7O0dBRUc7QUFRSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBT3ZEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxrQkFBa0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxVQUFVLENBQVMsS0FBSztRQUM1QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQVMsS0FBSztRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGLENBQUE7QUEvQkM7SUFEQyxrQkFBTSxFQUFFOzhCQUNjLCtCQUFxQjtvRUFBQztBQUc3QztJQURDLGtCQUFNLEVBQUU7O2tEQUNJO0FBT2I7SUFEQyxlQUFHLENBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7OytEQUd6QztBQU9EO0lBREMsZUFBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNoQixXQUFBLGdCQUFJLEVBQUUsQ0FBQTs7Ozt1REFFdkI7QUFPRDtJQURDLGdCQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2QsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7d0RBRXhCO0FBaENVLHFCQUFxQjtJQVBqQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNyQixNQUFNLEVBQUUsMkJBQWlCO1FBQ3pCLE9BQU8sRUFBRSwrQkFBcUI7S0FDL0IsQ0FBQztHQUNXLHFCQUFxQixDQWlDakM7QUFqQ1ksc0RBQXFCIn0=