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
exports.UserCollectionAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const collection_1 = require("../entity/collection");
/**
 * 描述
 */
let UserCollectionAdminService = class UserCollectionAdminService extends core_1.BaseService {
};
__decorate([
    orm_1.InjectEntityModel(collection_1.UserCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserCollectionAdminService.prototype, "userCollectionEntity", void 0);
UserCollectionAdminService = __decorate([
    decorator_1.Provide()
], UserCollectionAdminService);
exports.UserCollectionAdminService = UserCollectionAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb2xsZWN0aW9uL3NlcnZpY2UvYWRtaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUFnRDtBQUNoRCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLHFEQUE0RDtBQUU1RDs7R0FFRztBQUVILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEsa0JBQVc7Q0FHMUQsQ0FBQTtBQURDO0lBREMsdUJBQWlCLENBQUMsaUNBQW9CLENBQUM7OEJBQ2xCLG9CQUFVO3dFQUF1QjtBQUY1QywwQkFBMEI7SUFEdEMsbUJBQU8sRUFBRTtHQUNHLDBCQUEwQixDQUd0QztBQUhZLGdFQUEwQiJ9