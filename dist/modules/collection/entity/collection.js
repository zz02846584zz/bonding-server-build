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
exports.UserCollectionEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let UserCollectionEntity = class UserCollectionEntity extends core_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ comment: '用戶ID' }),
    __metadata("design:type", Number)
], UserCollectionEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ comment: '收藏類型' }),
    __metadata("design:type", String)
], UserCollectionEntity.prototype, "collectionType", void 0);
__decorate([
    typeorm_1.Column({ comment: '收藏目標ID' }),
    __metadata("design:type", Number)
], UserCollectionEntity.prototype, "collectionId", void 0);
UserCollectionEntity = __decorate([
    orm_1.EntityModel('user_collection')
], UserCollectionEntity);
exports.UserCollectionEntity = UserCollectionEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvY2FzZS9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxlY3Rpb24vZW50aXR5L2NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLGlCQUFVO0NBVW5ELENBQUE7QUFSQztJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O29EQUNiO0FBSWY7SUFGQyxnQkFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs0REFFTDtBQUd2QjtJQURDLGdCQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7OzBEQUNUO0FBVFYsb0JBQW9CO0lBRGhDLGlCQUFXLENBQUMsaUJBQWlCLENBQUM7R0FDbEIsb0JBQW9CLENBVWhDO0FBVlksb0RBQW9CIn0=