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
exports.BaseSysUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/sys/user");
const perms_1 = require("./perms");
const _ = require("lodash");
const user_role_1 = require("../../entity/sys/user_role");
const md5 = require("md5");
const department_1 = require("../../entity/sys/department");
const cache_1 = require("@midwayjs/cache");
/**
 * 系统用户
 */
let BaseSysUserService = class BaseSysUserService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord, status, departmentIds = [] } = query;
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(this.ctx.admin.userId); // 部门权限
        const sql = `
        SELECT
            a.id,
            a.firstName,
            a.lastName,
            a.username,
            concat(a.firstName, ' ', a.lastName) As fullName,
            a.headImg,
            a.birthday,
            a.id_card,
            a.email,
            a.phone,
            a.gender,
            a.remark,
            a.intro,
            a.status,
            a.verify,
            a.createTime,
            a.updateTime,
            a.departmentId,

            GROUP_CONCAT(c.name) AS roleName,
            d.name as departmentName
        FROM
            base_sys_user a
            LEFT JOIN base_sys_user_role b ON a.id = b.userId
            LEFT JOIN base_sys_role c ON b.roleId = c.id
            LEFT JOIN base_sys_department d on a.departmentId = d.id
        WHERE 1 = 1
            ${this.setSql(!_.isEmpty(departmentIds), 'and a.departmentId in (?)', [departmentIds])}
            ${this.setSql(status, 'and a.status = ?', [status])}
            ${this.setSql(keyWord, 'and (concat(a.firstName, a.lastName) LIKE ? or a.email LIKE ? or a.id_card LIKE ? or a.phone LIKE ?)', [`%${keyWord}%`, `%${keyWord}%`, `%${keyWord}%`, `%${keyWord}%`])}
            
            ${this.setSql(true, 'and a.username != ?', ['admin'])}
            ${this.setSql(this.ctx.admin.username !== 'admin', 'and a.departmentId in (?)', [!_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null]])}
        GROUP BY a.id
        `;
        return this.sqlRenderPage(sql, query);
    }
    /**
     * 移动部门
     * @param departmentId
     * @param userIds
     */
    async move(departmentId, userIds) {
        await this.baseSysUserEntity
            .createQueryBuilder()
            .update()
            .set({ departmentId })
            .where('id in (:userIds)', { userIds })
            .execute();
    }
    /**
     * 获得个人信息
     */
    async person() {
        var _a;
        const info = await this.baseSysUserEntity.findOne({
            id: (_a = this.ctx.admin) === null || _a === void 0 ? void 0 : _a.userId,
        });
        info['fullName'] = `${info.firstName} ${info.lastName}`;
        info === null || info === void 0 ? true : delete info.password;
        return info;
    }
    /**
     * 更新用户角色关系
     * @param user
     */
    async updateUserRole(user) {
        if (user.username === 'admin') {
            throw new core_1.CoolCommException('非法操作~');
        }
        await this.baseSysUserRoleEntity.delete({ userId: user.id });
        if (user.roleIdList) {
            for (const roleId of user.roleIdList) {
                await this.baseSysUserRoleEntity.save({ userId: user.id, roleId });
            }
        }
        await this.baseSysPermsService.refreshPerms(user.id);
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        const exists = await this.baseSysUserEntity.findOne({
            username: param.username,
        });
        if (!_.isEmpty(exists)) {
            throw new core_1.CoolCommException('用户名已经存在~');
        }
        param.password = md5(param.password);
        await this.baseSysUserEntity.save(param);
        await this.updateUserRole(param);
        return param.id;
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysUserEntity.findOne({ id });
        const userRoles = await this.nativeQuery('select a.roleId from base_sys_user_role a where a.userId = ?', [id]);
        const department = await this.baseSysDepartmentEntity.findOne({
            id: info.departmentId,
        });
        if (info) {
            delete info.password;
            if (userRoles) {
                info.roleIdList = userRoles.map(e => {
                    return parseInt(e.roleId);
                });
            }
        }
        delete info.password;
        if (department) {
            info.departmentName = department.name;
        }
        return info;
    }
    /**
     * 修改个人信息
     * @param param
     */
    async personUpdate(param) {
        param.id = this.ctx.admin.userId;
        if (!_.isEmpty(param.password)) {
            const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
            if (!userInfo)
                throw new core_1.CoolCommException('用户不存在');
            param.password = md5(param.password);
            param.passwordV = userInfo.passwordV + 1;
        }
        else {
            delete param.password;
        }
        await this.baseSysUserEntity.save(param);
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        if (param.id && param.username === 'admin') {
            throw new core_1.CoolCommException('非法操作');
        }
        if (!_.isEmpty(param.password)) {
            param.password = md5(param.password);
            const userInfo = await this.baseSysUserEntity.findOne({ id: param.id });
            if (!userInfo) {
                throw new core_1.CoolCommException('用户不存在');
            }
            param.passwordV = userInfo.passwordV + 1;
            await this.cacheManager.set(`admin:passwordVersion:${param.id}`, param.passwordV);
        }
        else {
            delete param.password;
        }
        if (param.status > 0) {
            await this.forbidden(param.id);
        }
        await this.baseSysUserEntity.save(param);
        await this.updateUserRole(param);
    }
    /**
     * 禁用用户
     * @param userId
     */
    async forbidden(userId) {
        await this.cacheManager.del(`admin:token:${userId}`);
    }
    /**
     * 用戶列表
     * @param userId
     */
    async list() {
        const sql = `
        SELECT
            a.id,
            a.firstName,
            a.lastName,
            a.username,
            concat(a.firstName, ' ', a.lastName) As fullName,
            a.headImg,
            a.birthday,
            a.id_card,
            a.email,
            a.phone,
            a.gender,
            a.remark,
            a.intro,
            a.status,
            a.createTime,
            a.updateTime,
            a.departmentId,

            GROUP_CONCAT(c.name) AS roleName,
            d.name as departmentName
        FROM
            base_sys_user a
            LEFT JOIN base_sys_user_role b ON a.id = b.userId
            LEFT JOIN base_sys_role c ON b.roleId = c.id
            LEFT JOIN base_sys_department d on a.departmentId = d.id
        WHERE 1 = 1
            and a.departmentId = 13
        GROUP BY a.id
        `;
        return this.nativeQuery(sql);
    }
};
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysUserService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.CacheManager)
], BaseSysUserService.prototype, "cacheManager", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysUserService.prototype, "baseSysPermsService", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseSysUserService.prototype, "ctx", void 0);
BaseSysUserService = __decorate([
    decorator_1.Provide()
], BaseSysUserService);
exports.BaseSysUserService = BaseSysUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELG1DQUE4QztBQUM5Qyw0QkFBNEI7QUFDNUIsMERBQW1FO0FBQ25FLDJCQUEyQjtBQUMzQiw0REFBc0U7QUFDdEUsMkNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxrQkFBVztJQW1CakQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN0RCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FDckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUN0QixDQUFDLENBQUMsT0FBTztRQUNWLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztjQTZCRixJQUFJLENBQUMsTUFBTSxDQUNYLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFDekIsMkJBQTJCLEVBQzNCLENBQUMsYUFBYSxDQUFDLENBQ2hCO2NBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUNqRCxJQUFJLENBQUMsTUFBTSxDQUNYLE9BQU8sRUFDUCxzR0FBc0csRUFDdEcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksT0FBTyxH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