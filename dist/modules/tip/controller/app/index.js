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
exports.TipApiController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const tipApi_1 = require("../../service/tipApi");
const entity_1 = require("../../entity");
const orm_1 = require("@midwayjs/orm");
/**
 * 描述
 */
let TipApiController = class TipApiController extends core_1.BaseController {
    /**
     * 今日小之日
     */
    async today() {
        return this.ok(await this.tipApiService.today());
    }
    /**
     * 今日小之日
     */
    async myTips() {
        return this.ok(await this.tipApiService.myList());
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", tipApi_1.TipApiService)
], TipApiController.prototype, "tipApiService", void 0);
__decorate([
    orm_1.InjectEntityModel(entity_1.TipEntity),
    __metadata("design:type", entity_1.TipEntity)
], TipApiController.prototype, "tipEntity", void 0);
__decorate([
    decorator_1.Post('/today', { summary: '今日小知識' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TipApiController.prototype, "today", null);
__decorate([
    decorator_1.Post('/my', { summary: '今日小知識' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TipApiController.prototype, "myTips", null);
TipApiController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController('/app/tip')
], TipApiController);
exports.TipApiController = TipApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvY29udHJvbGxlci9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTREO0FBQzVELDRDQUFtRTtBQUNuRSxpREFBcUQ7QUFDckQseUNBQXlDO0FBQ3pDLHVDQUFrRDtBQUVsRDs7R0FFRztBQUdILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEscUJBQWM7SUFPbEQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSztRQUNULE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQTtBQXBCQztJQURDLGtCQUFNLEVBQUU7OEJBQ00sc0JBQWE7dURBQUM7QUFHN0I7SUFEQyx1QkFBaUIsQ0FBQyxrQkFBUyxDQUFDOzhCQUNsQixrQkFBUzttREFBQztBQU1yQjtJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOzs7OzZDQUdwQztBQU1EO0lBREMsZ0JBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Ozs7OENBR2pDO0FBckJVLGdCQUFnQjtJQUY1QixtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQyxVQUFVLENBQUM7R0FDZCxnQkFBZ0IsQ0FzQjVCO0FBdEJZLDRDQUFnQiJ9