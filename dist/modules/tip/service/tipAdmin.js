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
exports.TipAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const category_1 = require("../entity/category");
const _ = require("lodash");
const view_1 = require("../entity/view");
/**
 * 描述
 */
let TipAdminService = class TipAdminService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { categoryIds = [] } = query;
        const sql = `
        SELECT
            a.*,

            GROUP_CONCAT(c.id) AS industryCategoryIdList,
            GROUP_CONCAT(c.name) AS categoryName
        FROM
            tip a
            LEFT JOIN tip_category b ON a.id = b.tipId
            LEFT JOIN industry_category c ON b.categoryId = c.id
        WHERE 1 = 1
            ${this.setSql(!_.isEmpty(categoryIds), 'and c.id in (?)', [
            categoryIds,
        ])}
        GROUP BY a.id
        `;
        return this.sqlRenderPage(sql, query);
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        const info = await this.tipEntity.findOne({ id });
        const categoryIds = await this.nativeQuery('select a.categoryId from tip_category a where a.tipId = ?', [id]);
        if (info && categoryIds) {
            if (categoryIds) {
                info.industryCategoryIdList = categoryIds.map(e => {
                    return parseInt(e.categoryId);
                });
            }
        }
        return info;
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.tipEntity.save(param);
        await this.updateTipCategory(param);
        return param.id;
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        const tipInfo = await this.tipEntity.findOne({ id: param.id });
        if (!tipInfo) {
            throw new core_1.CoolCommException('小知識不存在');
        }
        await this.tipEntity.save(param);
        await this.updateTipCategory(param);
    }
    /**
     * 更新小知識分類關係
     * @param tip
     */
    async updateTipCategory(tip) {
        await this.tipCategoryEntity.delete({ tipId: tip.id });
        if (tip.industryCategoryIdList) {
            await this.tipCategoryEntity.save({
                tipId: tip.id,
                categoryId: tip.industryCategoryIdList,
            });
            // for (const categoryId of tip.industryCategoryIdList) {
            // }
        }
    }
};
__decorate([
    orm_1.InjectEntityModel(entity_1.TipEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAdminService.prototype, "tipEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(category_1.TipCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAdminService.prototype, "tipCategoryEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(view_1.TipViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAdminService.prototype, "tipViewEntity", void 0);
TipAdminService = __decorate([
    decorator_1.Provide()
], TipAdminService);
exports.TipAdminService = TipAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwQWRtaW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvc2VydmljZS90aXBBZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsc0NBQXNDO0FBQ3RDLGlEQUF1RDtBQUV2RCw0QkFBNEI7QUFDNUIseUNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxrQkFBVztJQVU5Qzs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsV0FBVyxHQUFHLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Y0FXRixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxpQkFBaUIsRUFBRTtZQUN4RCxXQUFXO1NBQ1osQ0FBQzs7U0FFTCxDQUFDO1FBQ04sT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FDeEMsMkRBQTJELEVBQzNELENBQUMsRUFBRSxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRTtZQUN2QixJQUFJLFdBQVcsRUFBRTtnQkFDZixJQUFJLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDaEQsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7UUFDYixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztRQUNELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO1FBQ3pCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRTtZQUM5QixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDYixVQUFVLEVBQUUsR0FBRyxDQUFDLHNCQUFzQjthQUN2QyxDQUFDLENBQUM7WUFDSCx5REFBeUQ7WUFDekQsSUFBSTtTQUNMO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUEzRkM7SUFEQyx1QkFBaUIsQ0FBQyxrQkFBUyxDQUFDOzhCQUNsQixvQkFBVTtrREFBWTtBQUdqQztJQURDLHVCQUFpQixDQUFDLDRCQUFpQixDQUFDOzhCQUNsQixvQkFBVTswREFBb0I7QUFHakQ7SUFEQyx1QkFBaUIsQ0FBQyxvQkFBYSxDQUFDOzhCQUNsQixvQkFBVTtzREFBZ0I7QUFSOUIsZUFBZTtJQUQzQixtQkFBTyxFQUFFO0dBQ0csZUFBZSxDQTZGM0I7QUE3RlksMENBQWUifQ==