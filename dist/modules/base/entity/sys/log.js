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
exports.BaseSysLogEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 系统日志
 */
let BaseSysLogEntity = class BaseSysLogEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '用户ID', nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], BaseSysLogEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: '行为', length: 100 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "action", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: 'ip', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "ip", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ comment: 'ip地址', nullable: true, length: 50 }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "ipAddr", void 0);
__decorate([
    typeorm_1.Column({ comment: '参数', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], BaseSysLogEntity.prototype, "params", void 0);
BaseSysLogEntity = __decorate([
    orm_1.EntityModel('base_sys_log')
], BaseSysLogEntity);
exports.BaseSysLogEntity = BaseSysLogEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUF3QztBQUV4Qzs7R0FFRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsaUJBQVU7Q0FtQi9DLENBQUE7QUFoQkM7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7Z0RBQzdDO0FBSWY7SUFGQyxlQUFLLEVBQUU7SUFDUCxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O2dEQUN4QjtBQUlmO0lBRkMsZUFBSyxFQUFFO0lBQ1AsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7OzRDQUMzQztBQUlYO0lBRkMsZUFBSyxFQUFFO0lBQ1AsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O2dEQUN6QztBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O2dEQUN6QztBQWxCSixnQkFBZ0I7SUFENUIsaUJBQVcsQ0FBQyxjQUFjLENBQUM7R0FDZixnQkFBZ0IsQ0FtQjVCO0FBbkJZLDRDQUFnQiJ9