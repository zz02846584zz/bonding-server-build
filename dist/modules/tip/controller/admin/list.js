"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipAdminController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const entity_1 = require("../../entity");
const tipAdmin_1 = require("../../service/tipAdmin");
/**
 * 描述
 */
let TipAdminController = class TipAdminController extends core_1.BaseController {
};
TipAdminController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: entity_1.TipEntity,
        service: tipAdmin_1.TipAdminService,
    })
], TipAdminController);
exports.TipAdminController = TipAdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3RpcC9jb250cm9sbGVyL2FkbWluL2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUFtRTtBQUNuRSx5Q0FBeUM7QUFDekMscURBQXlEO0FBRXpEOztHQUVHO0FBT0gsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBNUMsa0JBQWtCO0lBTjlCLG1CQUFPLEVBQUU7SUFDVCxxQkFBYyxDQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLGtCQUFTO1FBQ2pCLE9BQU8sRUFBRSwwQkFBZTtLQUN6QixDQUFDO0dBQ1csa0JBQWtCLENBQTBCO0FBQTVDLGdEQUFrQiJ9