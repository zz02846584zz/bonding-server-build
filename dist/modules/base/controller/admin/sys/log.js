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
exports.BaseSysLogController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const log_1 = require("../../../entity/sys/log");
const user_1 = require("../../../entity/sys/user");
const conf_1 = require("../../../service/sys/conf");
const log_2 = require("../../../service/sys/log");
/**
 * 系统日志
 */
let BaseSysLogController = class BaseSysLogController extends core_1.BaseController {
    /**
     * 清空日志
     */
    async clear() {
        await this.baseSysLogService.clear(true);
        return this.ok();
    }
    /**
     * 设置日志保存时间
     */
    async setKeep(value) {
        await this.baseSysConfService.updateVaule('logKeep', value);
        return this.ok();
    }
    /**
     * 获得日志保存时间
     */
    async getKeep() {
        return this.ok(await this.baseSysConfService.getValue('logKeep'));
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", log_2.BaseSysLogService)
], BaseSysLogController.prototype, "baseSysLogService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogController.prototype, "baseSysConfService", void 0);
__decorate([
    decorator_1.Post('/clear', { summary: '清理' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "clear", null);
__decorate([
    decorator_1.Post('/setKeep', { summary: '日志保存时间' }),
    __param(0, decorator_1.Body('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "setKeep", null);
__decorate([
    decorator_1.Get('/getKeep', { summary: '获得日志保存时间' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseSysLogController.prototype, "getKeep", null);
BaseSysLogController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['page'],
        entity: log_1.BaseSysLogEntity,
        urlTag: {
            name: 'a',
            url: ['add'],
        },
        pageQueryOp: {
            keyWordLikeFields: ['name', 'a.params', 'a.ipAddr'],
            select: ['a.*', "concat(b.firstName, ' ', b.lastName) As name"],
            join: [
                {
                    entity: user_1.BaseSysUserEntity,
                    alias: 'b',
                    condition: 'a.userId = b.id',
                    type: 'leftJoin',
                },
            ],
        },
    })
], BaseSysLogController);
exports.BaseSysLogController = BaseSysLogController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL3N5cy9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXVFO0FBQ3ZFLDRDQUFtRTtBQUNuRSxpREFBMkQ7QUFDM0QsbURBQTZEO0FBQzdELG9EQUErRDtBQUMvRCxrREFBNkQ7QUFFN0Q7O0dBRUc7QUFzQkgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxxQkFBYztJQU90RDs7T0FFRztJQUVJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFFSSxLQUFLLENBQUMsT0FBTyxDQUFnQixLQUFhO1FBQy9DLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBRUksS0FBSyxDQUFDLE9BQU87UUFDbEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRixDQUFBO0FBOUJDO0lBREMsa0JBQU0sRUFBRTs4QkFDVSx1QkFBaUI7K0RBQUM7QUFHckM7SUFEQyxrQkFBTSxFQUFFOzhCQUNXLHlCQUFrQjtnRUFBQztBQU12QztJQURDLGdCQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs7O2lEQUlqQztBQU1EO0lBREMsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDbEIsV0FBQSxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O21EQUdsQztBQU1EO0lBREMsZUFBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzs7OzttREFHeEM7QUEvQlUsb0JBQW9CO0lBckJoQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxzQkFBZ0I7UUFDeEIsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLEdBQUc7WUFDVCxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7WUFDbkQsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLDhDQUE4QyxDQUFDO1lBQy9ELElBQUksRUFBRTtnQkFDSjtvQkFDRSxNQUFNLEVBQUUsd0JBQWlCO29CQUN6QixLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUsaUJBQWlCO29CQUM1QixJQUFJLEVBQUUsVUFBVTtpQkFDakI7YUFDRjtTQUNGO0tBQ0YsQ0FBQztHQUNXLG9CQUFvQixDQWdDaEM7QUFoQ1ksb0RBQW9CIn0=