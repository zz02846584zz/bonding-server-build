"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const category_1 = require("../../entity/category");
const category_2 = require("../../service/admin/category");
/**
 * 描述
 */
let IndustryCategoryController = class IndustryCategoryController extends core_1.BaseController {
};
IndustryCategoryController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        prefix: '/api/industry/category',
        api: ['list'],
        entity: category_1.IndustryCategoryEntity,
        service: category_2.IndustryCategoryService,
    })
], IndustryCategoryController);
exports.IndustryCategoryController = IndustryCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9jb250cm9sbGVyL2FwaS9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLG9EQUErRDtBQUMvRCwyREFBdUU7QUFFdkU7O0dBRUc7QUFRSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUFwRCwwQkFBMEI7SUFQdEMsbUJBQU8sRUFBRTtJQUNULHFCQUFjLENBQUM7UUFDZCxNQUFNLEVBQUUsd0JBQXdCO1FBQ2hDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxpQ0FBc0I7UUFDOUIsT0FBTyxFQUFFLGtDQUF1QjtLQUNqQyxDQUFDO0dBQ1csMEJBQTBCLENBQTBCO0FBQXBELGdFQUEwQiJ9