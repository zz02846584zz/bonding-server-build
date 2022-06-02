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
exports.UserCollectionApiController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const collection_1 = require("../../entity/collection");
const api_1 = require("../../service/api");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let UserCollectionApiController = class UserCollectionApiController extends core_1.BaseController {
};
__decorate([
    orm_1.InjectEntityModel(collection_1.UserCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserCollectionApiController.prototype, "userCollectionEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", api_1.UserCollectionApiService)
], UserCollectionApiController.prototype, "userCollectionApiService", void 0);
UserCollectionApiController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController({
        prefix: '/api/collection',
        api: ['add', 'delete', 'page'],
        entity: collection_1.UserCollectionEntity,
        service: api_1.UserCollectionApiService,
    })
], UserCollectionApiController);
exports.UserCollectionApiController = UserCollectionApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb2xsZWN0aW9uL2NvbnRyb2xsZXIvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsd0RBQStEO0FBQy9ELDJDQUE2RDtBQUM3RCx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBSXJDOztHQUVHO0FBUUgsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSxxQkFBYztDQVk5RCxDQUFBO0FBVkM7SUFEQyx1QkFBaUIsQ0FBQyxpQ0FBb0IsQ0FBQzs4QkFDbEIsb0JBQVU7eUVBQXVCO0FBR3ZEO0lBREMsa0JBQU0sRUFBRTs4QkFDaUIsOEJBQXdCOzZFQUFDO0FBTHhDLDJCQUEyQjtJQVB2QyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsQ0FBQztRQUNkLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDOUIsTUFBTSxFQUFFLGlDQUFvQjtRQUM1QixPQUFPLEVBQUUsOEJBQXdCO0tBQ2xDLENBQUM7R0FDVywyQkFBMkIsQ0FZdkM7QUFaWSxrRUFBMkIifQ==