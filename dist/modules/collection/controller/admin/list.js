"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserCollectionController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const collection_1 = require("../../entity/collection");
const admin_1 = require("../../service/admin");
/**
 * 描述
 */
let AdminUserCollectionController = class AdminUserCollectionController extends core_1.BaseController {
};
AdminUserCollectionController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: collection_1.UserCollectionEntity,
        service: admin_1.UserCollectionAdminService,
    })
], AdminUserCollectionController);
exports.AdminUserCollectionController = AdminUserCollectionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxlY3Rpb24vY29udHJvbGxlci9hZG1pbi9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsd0RBQStEO0FBQy9ELCtDQUFpRTtBQUVqRTs7R0FFRztBQU9ILElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQThCLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQXZELDZCQUE2QjtJQU56QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxpQ0FBb0I7UUFDNUIsT0FBTyxFQUFFLGtDQUEwQjtLQUNwQyxDQUFDO0dBQ1csNkJBQTZCLENBQTBCO0FBQXZELHNFQUE2QiJ9