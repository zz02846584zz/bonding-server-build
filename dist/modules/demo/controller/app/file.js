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
exports.AppDemoFileController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const file_1 = require("@cool-midway/file");
/**
 * 文件上传
 */
let AppDemoFileController = class AppDemoFileController extends core_1.BaseController {
    async uplod() {
        return this.ok(await this.file.upload(this.ctx));
    }
    async uploadMode() {
        return this.ok(await this.file.getMode());
    }
    async downAndUpload() {
        return this.ok(await this.file.downAndUpload('https://cool-js.com/notice.png'));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], AppDemoFileController.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", file_1.CoolFile)
], AppDemoFileController.prototype, "file", void 0);
__decorate([
    decorator_1.Post('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoFileController.prototype, "uplod", null);
__decorate([
    decorator_1.Get('/uploadMode', { summary: '获得上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoFileController.prototype, "uploadMode", null);
__decorate([
    decorator_1.Post('/downAndUpload', { summary: '下载并上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoFileController.prototype, "downAndUpload", null);
AppDemoFileController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], AppDemoFileController);
exports.AppDemoFileController = AppDemoFileController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vY29udHJvbGxlci9hcHAvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBaUU7QUFDakUsNENBQW1FO0FBRW5FLDRDQUE2QztBQUU3Qzs7R0FFRztBQUdILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFRdkQsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsS0FBSyxDQUFDLFVBQVU7UUFDZCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELEtBQUssQ0FBQyxhQUFhO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FDWixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQ2hFLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXJCQztJQURDLGtCQUFNLEVBQUU7O2tEQUNJO0FBR2I7SUFEQyxrQkFBTSxFQUFFOzhCQUNILGVBQVE7bURBQUM7QUFHZjtJQURDLGdCQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7O2tEQUdwQztBQUdEO0lBREMsZUFBRyxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs7Ozt1REFHekM7QUFHRDtJQURDLGdCQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Ozs7MERBSzVDO0FBdEJVLHFCQUFxQjtJQUZqQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLHFCQUFxQixDQXVCakM7QUF2Qlksc0RBQXFCIn0=