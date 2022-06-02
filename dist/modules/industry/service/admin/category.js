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
exports.IndustryCategoryService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const category_1 = require("../../entity/category");
/**
 * 描述
 */
let IndustryCategoryService = class IndustryCategoryService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const sql = `
        SELECT
            a.*,
            count(b.id) as newsCount,
            count(c.id) as tipCount
        FROM
            industry_category a
            LEFT JOIN news_article_category b ON b.categoryId = b.id
            LEFT JOIN tip_category c ON c.categoryId = b.id
        WHERE 1 = 1
        GROUP BY a.id
        `;
        return this.sqlRenderPage(sql, query);
    }
    /**
     * 分页查询
     * @param query
     */
    async list() {
        const result = await this.nativeQuery(`
        SELECT
            a.*,
            count(b.id) as newsCount,
            count(c.id) as tipCount
        FROM
            industry_category a
            LEFT JOIN news_article_category b ON b.categoryId = b.id
            LEFT JOIN tip_category c ON c.categoryId = b.id
        WHERE 1 = 1
        GROUP BY a.id
      `);
        return result;
    }
};
__decorate([
    orm_1.InjectEntityModel(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], IndustryCategoryService.prototype, "industryCategoryEntity", void 0);
IndustryCategoryService = __decorate([
    decorator_1.Provide()
], IndustryCategoryService);
exports.IndustryCategoryService = IndustryCategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9zZXJ2aWNlL2FkbWluL2NhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxvREFBK0Q7QUFFL0Q7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGtCQUFXO0lBSXREOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNkLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7OztTQVdQLENBQUM7UUFDTixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSTtRQUNSLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7T0FXbkMsQ0FBQyxDQUFDO1FBRUwsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUE7QUExQ0M7SUFEQyx1QkFBaUIsQ0FBQyxpQ0FBc0IsQ0FBQzs4QkFDbEIsb0JBQVU7dUVBQXlCO0FBRmhELHVCQUF1QjtJQURuQyxtQkFBTyxFQUFFO0dBQ0csdUJBQXVCLENBNENuQztBQTVDWSwwREFBdUIifQ==