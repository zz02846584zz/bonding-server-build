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
exports.NewsCommentApiController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const comment_1 = require("../../entity/comment");
const comment_2 = require("../../service/api/comment");
/**
 * 描述
 */
let NewsCommentApiController = class NewsCommentApiController extends core_1.BaseController {
    /**
     * 登錄
     * @param param
     */
    async child(param) {
        return this.ok(await this.newsCommentService.child(param));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", comment_2.NewsCommentApiService)
], NewsCommentApiController.prototype, "newsCommentService", void 0);
__decorate([
    decorator_1.Post('/child', { summary: '取得留言' }),
    __param(0, decorator_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsCommentApiController.prototype, "child", null);
NewsCommentApiController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        prefix: '/api/news/article/comment',
        api: ['add', 'delete', 'update', 'page'],
        entity: comment_1.NewsArticleCommentEntity,
        service: comment_2.NewsCommentApiService,
    })
], NewsCommentApiController);
exports.NewsCommentApiController = NewsCommentApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvY29udHJvbGxlci9hcGkvY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLGtEQUFnRTtBQUNoRSx1REFBa0U7QUFFbEU7O0dBRUc7QUFRSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLHFCQUFjO0lBSTFEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxLQUFLLENBQVMsS0FBSztRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGLENBQUE7QUFWQztJQURDLGtCQUFNLEVBQUU7OEJBQ1csK0JBQXFCO29FQUFDO0FBTzFDO0lBREMsZ0JBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdkIsV0FBQSxnQkFBSSxFQUFFLENBQUE7Ozs7cURBRWxCO0FBWFUsd0JBQXdCO0lBUHBDLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ2QsTUFBTSxFQUFFLDJCQUEyQjtRQUNuQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDeEMsTUFBTSxFQUFFLGtDQUF3QjtRQUNoQyxPQUFPLEVBQUUsK0JBQXFCO0tBQy9CLENBQUM7R0FDVyx3QkFBd0IsQ0FZcEM7QUFaWSw0REFBd0IifQ==