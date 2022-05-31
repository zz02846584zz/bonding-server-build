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
exports.IndustryCategoryApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const category_1 = require("../../entity/category");
/**
 * 描述
 */
let IndustryCategoryApiService = class IndustryCategoryApiService extends core_1.BaseService {
};
__decorate([
    orm_1.InjectEntityModel(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], IndustryCategoryApiService.prototype, "industryCategoryEntity", void 0);
IndustryCategoryApiService = __decorate([
    decorator_1.Provide()
], IndustryCategoryApiService);
exports.IndustryCategoryApiService = IndustryCategoryApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9zZXJ2aWNlL2FwaS9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsb0RBQStEO0FBRS9EOztHQUVHO0FBRUgsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxrQkFBVztDQUcxRCxDQUFBO0FBREM7SUFEQyx1QkFBaUIsQ0FBQyxpQ0FBc0IsQ0FBQzs4QkFDbEIsb0JBQVU7MEVBQXlCO0FBRmhELDBCQUEwQjtJQUR0QyxtQkFBTyxFQUFFO0dBQ0csMEJBQTBCLENBR3RDO0FBSFksZ0VBQTBCIn0=