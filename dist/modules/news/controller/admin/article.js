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
exports.NewsArticleAdminController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const article_1 = require("../../service/admin/article");
const article_2 = require("../../entity/article");
/**
 * 描述
 */
let NewsArticleAdminController = class NewsArticleAdminController extends core_1.BaseController {
    /**
     * 分類
     * @param param
     */
    async getArticleCategory(param) {
        return this.ok(await this.newsArticleAdminService.getCommentByArticleId(param));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", article_1.NewsArticleAdminService)
], NewsArticleAdminController.prototype, "newsArticleAdminService", void 0);
__decorate([
    decorator_1.Post('/comment', { summary: '取得留言' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleAdminController.prototype, "getArticleCategory", null);
NewsArticleAdminController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: article_2.NewsArticleEntity,
        service: article_1.NewsArticleAdminService,
    })
], NewsArticleAdminController);
exports.NewsArticleAdminController = NewsArticleAdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvY29udHJvbGxlci9hZG1pbi9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUseURBQXNFO0FBQ3RFLGtEQUF5RDtBQUV6RDs7R0FFRztBQU9ILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEscUJBQWM7SUFJNUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFTLEtBQUs7UUFDcEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUNaLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUNoRSxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFaQztJQURDLGtCQUFNLEVBQUU7OEJBQ2dCLGlDQUF1QjsyRUFBQztBQU9qRDtJQURDLGdCQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ1osV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7b0VBSS9CO0FBYlUsMEJBQTBCO0lBTnRDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLDJCQUFpQjtRQUN6QixPQUFPLEVBQUUsaUNBQXVCO0tBQ2pDLENBQUM7R0FDVywwQkFBMEIsQ0FjdEM7QUFkWSxnRUFBMEIifQ==