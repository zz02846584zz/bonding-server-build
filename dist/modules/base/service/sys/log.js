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
exports.BaseSysLogService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const log_1 = require("../../entity/sys/log");
const moment = require("moment");
const utils_1 = require("../../../../comm/utils");
const conf_1 = require("./conf");
/**
 * 描述
 */
let BaseSysLogService = class BaseSysLogService extends core_1.BaseService {
    /**
     * 记录
     * @param url URL地址
     * @param params 参数
     * @param userId 用户ID
     */
    async record(context, url, params, userId) {
        const ip = await this.utils.getReqIP(context);
        const sysLog = new log_1.BaseSysLogEntity();
        sysLog.userId = userId;
        sysLog.ip = typeof ip === 'string' ? ip : ip.join(',');
        const ipAddrArr = [];
        for (const e of sysLog.ip.split(','))
            ipAddrArr.push(await await this.utils.getIpAddr(context, e));
        sysLog.ipAddr = ipAddrArr.join(',');
        if (sysLog.ipAddr == '本机地址') {
            sysLog.ipAddr = '本機地址';
        }
        sysLog.action = url;
        if (!_.isEmpty(params)) {
            sysLog.params = JSON.stringify(params);
        }
        await this.baseSysLogEntity.insert(sysLog);
    }
    /**
     * 日志
     * @param isAll 是否清除全部
     */
    async clear(isAll) {
        if (isAll) {
            await this.baseSysLogEntity.clear();
            return;
        }
        const keepDay = await this.baseSysConfService.getValue('logKeep');
        if (keepDay) {
            const beforeDate = `${moment()
                .add(-keepDay, 'days')
                .format('YYYY-MM-DD')} 00:00:00`;
            await this.baseSysLogEntity
                .createQueryBuilder()
                .delete()
                .where('createTime < :createTime', { createTime: beforeDate })
                .execute();
        }
        else {
            await this.baseSysLogEntity.clear();
        }
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysLogService.prototype, "ctx", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", utils_1.Utils)
], BaseSysLogService.prototype, "utils", void 0);
__decorate([
    orm_1.InjectEntityModel(log_1.BaseSysLogEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLogService.prototype, "baseSysLogEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogService.prototype, "baseSysConfService", void 0);
BaseSysLogService = __decorate([
    decorator_1.Provide()
], BaseSysLogService);
exports.BaseSysLogService = BaseSysLogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9jYXNlL2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFnRDtBQUNoRCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLDRCQUE0QjtBQUM1Qiw4Q0FBd0Q7QUFDeEQsaUNBQWlDO0FBQ2pDLGtEQUErQztBQUMvQyxpQ0FBNEM7QUFHNUM7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGtCQUFXO0lBYWhEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTTtRQUNoRCxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLElBQUksc0JBQWdCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixNQUFNLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUNELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFNO1FBQ2hCLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxVQUFVLEdBQUcsR0FBRyxNQUFNLEVBQUU7aUJBQzNCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7aUJBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxDQUFDLGdCQUFnQjtpQkFDeEIsa0JBQWtCLEVBQUU7aUJBQ3BCLE1BQU0sRUFBRTtpQkFDUixLQUFLLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUM7aUJBQzdELE9BQU8sRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUEzREM7SUFEQyxrQkFBTSxFQUFFOzs4Q0FDTDtBQUdKO0lBREMsa0JBQU0sRUFBRTs4QkFDRixhQUFLO2dEQUFDO0FBR2I7SUFEQyx1QkFBaUIsQ0FBQyxzQkFBZ0IsQ0FBQzs4QkFDbEIsb0JBQVU7MkRBQW1CO0FBRy9DO0lBREMsa0JBQU0sRUFBRTs4QkFDVyx5QkFBa0I7NkRBQUM7QUFYNUIsaUJBQWlCO0lBRDdCLG1CQUFPLEVBQUU7R0FDRyxpQkFBaUIsQ0E2RDdCO0FBN0RZLDhDQUFpQiJ9