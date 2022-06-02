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
exports.TaskInfoController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
const info_2 = require("../../service/info");
/**
 * 任务
 */
let TaskInfoController = class TaskInfoController extends core_1.BaseController {
    /**
     * 手动执行一次
     */
    async once(id) {
        await this.taskInfoService.once(id);
        this.ok();
    }
    /**
     * 暂停任务
     */
    async stop(id) {
        await this.taskInfoService.stop(id);
        this.ok();
    }
    /**
     * 开始任务
     */
    async start(id, type) {
        await this.taskInfoService.start(id, type);
        this.ok();
    }
    /**
     * 日志
     */
    async log(params) {
        return this.ok(await this.taskInfoService.log(params));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", info_2.TaskInfoService)
], TaskInfoController.prototype, "taskInfoService", void 0);
__decorate([
    decorator_1.Post('/once', { summary: '执行一次' }),
    __param(0, decorator_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "once", null);
__decorate([
    decorator_1.Post('/stop', { summary: '停止' }),
    __param(0, decorator_1.Body('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "stop", null);
__decorate([
    decorator_1.Post('/start', { summary: '开始' }),
    __param(0, decorator_1.Body('id')), __param(1, decorator_1.Body('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "start", null);
__decorate([
    decorator_1.Get('/log', { summary: '日志' }),
    __param(0, decorator_1.Query(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskInfoController.prototype, "log", null);
TaskInfoController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'page'],
        entity: info_1.TaskInfoEntity,
        service: info_2.TaskInfoService,
        before: ctx => {
            ctx.request.body.limit = ctx.request.body.repeatCount;
        },
        pageQueryOp: {
            fieldEq: ['status', 'type'],
        },
    })
], TaskInfoController);
exports.TaskInfoController = TaskInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3Rhc2svY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQVE2QjtBQUM3Qiw0Q0FBbUU7QUFDbkUsNENBQW1EO0FBQ25ELDZDQUFxRDtBQUVyRDs7R0FFRztBQWFILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQWM7SUFJcEQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFhLEVBQVU7UUFDL0IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFhLEVBQVU7UUFDL0IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFhLEVBQVUsRUFBZ0IsSUFBWTtRQUM1RCxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsR0FBRyxDQUFhLE1BQVc7UUFDL0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0YsQ0FBQTtBQXBDQztJQURDLGtCQUFNLEVBQUU7OEJBQ1Esc0JBQWU7MkRBQUM7QUFNakM7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLGdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7OENBR3JCO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7OENBR3JCO0FBTUQ7SUFEQyxnQkFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLGdCQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsRUFBYyxXQUFBLGdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7Ozs7K0NBR2hEO0FBTUQ7SUFEQyxlQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BCLFdBQUEsaUJBQUssQ0FBQyxlQUFHLENBQUMsQ0FBQTs7Ozs2Q0FFcEI7QUFyQ1Usa0JBQWtCO0lBWjlCLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNoRCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsT0FBTyxFQUFFLHNCQUFlO1FBQ3hCLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNaLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEQsQ0FBQztRQUNELFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDNUI7S0FDRixDQUFDO0dBQ1csa0JBQWtCLENBc0M5QjtBQXRDWSxnREFBa0IifQ==