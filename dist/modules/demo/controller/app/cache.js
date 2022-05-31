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
exports.AppDemoCacheController = void 0;
const cache_1 = require("./../../service/cache");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const cache_2 = require("@midwayjs/cache");
/**
 * 缓存
 */
let AppDemoCacheController = class AppDemoCacheController extends core_1.BaseController {
    /**
     * 设置缓存
     * @returns
     */
    async set() {
        await this.cacheManager.set('a', 1);
        // 缓存10秒
        await this.cacheManager.set('a', 1, {
            ttl: 10,
        });
        return this.ok(await this.cacheManager.get('a'));
    }
    /**
     * 获得缓存
     * @returns
     */
    async get() {
        return this.ok(await this.demoCacheService.get());
    }
};
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_2.CacheManager)
], AppDemoCacheController.prototype, "cacheManager", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.DemoCacheService)
], AppDemoCacheController.prototype, "demoCacheService", void 0);
__decorate([
    decorator_1.Post('/set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoCacheController.prototype, "set", null);
__decorate([
    decorator_1.Get('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoCacheController.prototype, "get", null);
AppDemoCacheController = __decorate([
    decorator_1.Provide(),
    core_1.CoolController()
], AppDemoCacheController);
exports.AppDemoCacheController = AppDemoCacheController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L2Nhc2UvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUF5RDtBQUN6RCxtREFBaUU7QUFDakUsNENBQW1FO0FBQ25FLDJDQUErQztBQUUvQzs7R0FFRztBQUdILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEscUJBQWM7SUFPeEQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxRQUFRO1FBQ1IsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLEdBQUcsRUFBRSxFQUFFO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQTtBQTNCQztJQURDLGtCQUFNLEVBQUU7OEJBQ0ssb0JBQVk7NERBQUM7QUFHM0I7SUFEQyxrQkFBTSxFQUFFOzhCQUNTLHdCQUFnQjtnRUFBQztBQU9uQztJQURDLGdCQUFJLENBQUMsTUFBTSxDQUFDOzs7O2lEQVFaO0FBT0Q7SUFEQyxlQUFHLENBQUMsTUFBTSxDQUFDOzs7O2lEQUdYO0FBNUJVLHNCQUFzQjtJQUZsQyxtQkFBTyxFQUFFO0lBQ1QscUJBQWMsRUFBRTtHQUNKLHNCQUFzQixDQTZCbEM7QUE3Qlksd0RBQXNCIn0=