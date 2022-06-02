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
exports.TipApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const entity_1 = require("../entity");
const view_1 = require("../entity/view");
const _ = require("lodash");
/**
 * 描述
 */
let TipApiService = class TipApiService extends core_1.BaseService {
    /**
     * 取得小知識列表
     *
     */
    async myList() {
        const query = { page: 1, size: 20 };
        const sql = `
        SELECT
            a.*,
            count(b.id) as viewCount

        FROM
            tip a
            LEFT JOIN tip_view b on a.id = b.tipId
        WHERE b.userId = ${this.ctx.user.userId}
        GROUP BY a.id
    `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order: 'publishDate',
        }));
        return result;
    }
    /**
     * 取得今日小知識
     *
     */
    async today() {
        const info = await this.tipEntity.findOne({
            publishDate: await this.todayFormat(),
        });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('今日無小知識');
        const exist = await this.tipViewEntity.findOne({
            userId: this.ctx.user.userId,
            tipId: info.id,
        });
        if (_.isEmpty(exist)) {
            await this.tipViewEntity.save({
                userId: this.ctx.user.userId,
                tipId: info.id,
            });
        }
        delete info.createTime;
        delete info.updateTime;
        delete info.status;
        delete info.publishDate;
        return info;
    }
    async todayFormat() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1); // Months start at 0!
        let dd = String(today.getDate());
        if (+dd < 10)
            dd = '0' + dd;
        if (+mm < 10)
            mm = '0' + mm;
        return yyyy + '-' + mm + '-' + dd;
    }
};
__decorate([
    orm_1.InjectEntityModel(entity_1.TipEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipApiService.prototype, "tipEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(view_1.TipViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipApiService.prototype, "tipViewEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], TipApiService.prototype, "ctx", void 0);
TipApiService = __decorate([
    decorator_1.Provide()
], TipApiService);
exports.TipApiService = TipApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwQXBpLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGlwL3NlcnZpY2UvdGlwQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxzQ0FBc0M7QUFDdEMseUNBQStDO0FBRy9DLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxrQkFBVztJQVU1Qzs7O09BR0c7SUFDSSxLQUFLLENBQUMsTUFBTTtRQUNqQixNQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxHQUFHOzs7Ozs7OzsyQkFRVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNOztLQUUxQyxDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNyQyxHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxLQUFLLEVBQUUsYUFBYTtTQUNyQixDQUFDLENBQ0gsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3hDLFdBQVcsRUFBRSxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUU7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNmLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO2FBQ2YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVc7UUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBQzVELElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUM1QixPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDcEMsQ0FBQztDQUNGLENBQUE7QUE1RUM7SUFEQyx1QkFBaUIsQ0FBQyxrQkFBUyxDQUFDOzhCQUNsQixvQkFBVTtnREFBWTtBQUdqQztJQURDLHVCQUFpQixDQUFDLG9CQUFhLENBQUM7OEJBQ2xCLG9CQUFVO29EQUFnQjtBQUd6QztJQURDLGtCQUFNLEVBQUU7OzBDQUNJO0FBUkYsYUFBYTtJQUR6QixtQkFBTyxFQUFFO0dBQ0csYUFBYSxDQThFekI7QUE5RVksc0NBQWEifQ==