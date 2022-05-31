"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAppSpaceInfoController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_1 = require("../../entity/info");
/**
 * 图片空间信息
 */
let BaseAppSpaceInfoController = class BaseAppSpaceInfoController extends core_1.BaseController {
};
BaseAppSpaceInfoController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.SpaceInfoEntity,
        pageQueryOp: {
            fieldEq: ['type', 'classifyId'],
        },
    })
], BaseAppSpaceInfoController);
exports.BaseAppSpaceInfoController = BaseAppSpaceInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3NwYWNlL2NvbnRyb2xsZXIvYWRtaW4vaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLDRDQUFvRDtBQUVwRDs7R0FFRztBQVNILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQXBELDBCQUEwQjtJQVJ0QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxzQkFBZTtRQUN2QixXQUFXLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO1NBQ2hDO0tBQ0YsQ0FBQztHQUNXLDBCQUEwQixDQUEwQjtBQUFwRCxnRUFBMEIifQ==