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
exports.BaseApiUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/sys/user");
const _ = require("lodash");
const user_role_1 = require("../../entity/sys/user_role");
const md5 = require("md5");
const department_1 = require("../../entity/sys/department");
const cache_1 = require("@midwayjs/cache");
const credentials_1 = require("../../../../config/credentials");
const user_identity_1 = require("../../entity/sys/user_identity");
/**
 * 系統用戶
 */
let BaseApiUserService = class BaseApiUserService extends core_1.BaseService {
    /**
     * 獲得個人信息
     */
    async person() {
        var _a;
        // return this.ctx.user;
        // get 緩存
        const info = await this.baseSysUserEntity.findOne({
            id: (_a = this.ctx.user) === null || _a === void 0 ? void 0 : _a.userId,
        });
        info === null || info === void 0 ? true : delete info.password;
        info === null || info === void 0 ? true : delete info.username;
        return info;
    }
    /**
     * 修改
     * @param param 數據
     */
    async personUpdate(param) {
        if (_.isEmpty(param))
            throw new core_1.CoolCommException('參數不能為空');
        param.id = this.ctx.admin.userId;
        const user = await this.baseSysUserEntity.findOne({ id: param.id });
        if (!user)
            throw new core_1.CoolCommException('用户不存在');
        delete param.password;
        await this.baseSysUserEntity.save(param);
    }
    /**
     * 重設密碼
     */
    async resetPassword(reset) {
        const userInfo = await this.baseSysUserEntity.findOne({
            id: this.ctx.user.userId,
        });
        if (!userInfo) {
            throw new core_1.CoolCommException('用户不存在');
        }
        if (!_.isEqual(md5(reset.oldPassword), userInfo.password)) {
            throw new core_1.CoolCommException('密碼輸入錯誤');
        }
        if (!_.isEqual(reset.newPassword, reset.newPasswordConfirm)) {
            throw new core_1.CoolCommException('兩次密碼輸入不一致');
        }
        if (_.isEqual(md5(reset.newPassword), userInfo.password)) {
            throw new core_1.CoolCommException('與目前的密碼相同');
        }
        const param = {
            id: this.ctx.user.userId,
            password: md5(reset.newPassword),
            passwordV: userInfo.passwordV + 1,
        };
        await this.baseSysUserEntity.save(param);
    }
    /**
     * 根據ID獲得信息
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
     * 刪除帳戶
     */
    async delete() {
        const userId = this.ctx.user.userId;
        const user = await this.baseSysUserEntity.findOne({ id: userId });
        if (user) {
            await this.baseSysUserEntity.save({ id: userId, status: 2 });
            await this.cacheManager.del(`user:department:${userId}`);
            await this.cacheManager.del(`user:perms:${userId}`);
            await this.cacheManager.del(`user:token:${userId}`);
            await this.cacheManager.del(`user:token:refresh:${userId}`);
        }
        else {
            throw new core_1.CoolCommException('用戶不存在');
        }
    }
    /**
     * 綁定Email
     */
    async bindingEmail(param) {
        const { email } = param;
        const nodemailer = require('nodemailer');
        const userInfo = await this.baseSysUserEntity.findOne({
            id: this.ctx.user.userId,
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: credentials_1.googleMail.user,
                pass: credentials_1.googleMail.pass,
            },
        });
        let mailOptions = {
            from: 'zz02846584zz@gmail.com',
            to: email,
            subject: '這是 node.js 發送的測試信件',
            //純文字
            text: 'Hello world2',
            //嵌入 html 的內文
            html: `<div class="">
      <div class="aHl"></div>
      <div id=":1pq" tabindex="-1"></div>
      <div
        id=":1v4"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."
      >
        <div id=":1tl" class="a3s aiL">
          <u></u>
    
          <div
            style="
              font-family: 'Helvetica Neue', Helvetica, 'PingFang TC',
                'Microsoft JhengHei', 'PMingLiU', sans-serif;
              line-height: inherit;
              margin: 0;
              padding: 0;
            "
            bgcolor="#fafafa"
          >
            <table
              style="
                border-collapse: collapse;
                table-layout: fixed;
                border-spacing: 0;
                vertical-align: top;
                min-width: 320px;
                width: 100%;
                line-height: inherit;
                margin: 0 auto;
              "
              cellpadding="0"
              cellspacing="0"
              bgcolor="#fafafa"
            >
              <tbody style="line-height: inherit">
                <tr
                  style="
                    vertical-align: top;
                    border-collapse: collapse;
                    line-height: inherit;
                  "
                >
                  <td
                    style="
                      word-break: break-word;
                      border-collapse: collapse !important;
                      line-height: inherit;
                    "
                    valign="top"
                  >
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: transparent;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: transparent;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 36px 0px 20px;
                                  border: 0px solid transparent;
                                "
                              >
                                <div
                                  align="center"
                                  style="
                                    padding-right: 0px;
                                    padding-left: 0px;
                                    line-height: inherit;
                                  "
                                >
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #ffffff;
                          border-bottom-width: 2px;
                          border-bottom-color: #efefef;
                          border-bottom-style: solid;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: #ffffff;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 5px 0px;
                                  border: 1px solid #efefef;
                                "
                              >
                                <div
                                  style="
                                    color: #333;
                                    line-height: 120%;
                                    padding: 30px;
                                  "
                                >
                                  <div
                                    style="font-size: 14px; line-height: 1.42857143"
                                    align="left"
                                  >
                                    <h1
                                      style="
                                        line-height: 1.1;
                                        font-weight: 500;
                                        font-size: 24px;
                                        margin-top: 0;
                                      "
                                    >
                                      你好 ${userInfo.firstName} ${userInfo.lastName}!
                                    </h1>
                                    <p style="line-height: 1.5">
                                    您可以通過下面的鏈接按鈕 <span class="il">確認</span> 您的帳戶電子郵件。
                                    </p>
                                    <div
                                      style="
                                        line-height: inherit;
                                        margin: 30px auto 14px;
                                      "
                                      align="center"
                                    >
                                      <a
                                        href="#"
                                        style="
                                          display: inline-block;
                                          color: #fff;
                                          background-color: #13ab67;
                                          border-radius: 3px;
                                          text-align: center;
                                          text-decoration: none;
                                          font-size: 16px;
                                          line-height: inherit;
                                          padding: 14px 30px;
                                        "
                                        target="_blank"
                                        ><span class="il">確認</span> Email</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: transparent;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: transparent;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 5px 0px;
                                  border: 0px solid transparent;
                                "
                              >
                                <div
                                  style="
                                    font-size: 12px;
                                    color: #aaa;
                                    line-height: inherit;
                                    padding: 10px;
                                  "
                                  align="center"
                                >
                                  您收到這封電子郵件是因為您已在 鍵結科技 申請綁定Email
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="yj6qo"></div>
          <div class="adL"></div>
        </div>
      </div>
      <div id=":1pu" class="ii gt" style="display: none">
        <div id=":1pv" class="a3s aiL"></div>
      </div>
      <div class="hi"></div>
    </div>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        return email;
    }
    /**
     * 身份驗證
     */
    async identityCert(param) {
        const userInfo = await this.baseSysUserEntity.findOne({
            id: this.ctx.user.userId,
        });
        if (userInfo.verify === 3)
            throw new core_1.CoolCommException('用戶已通過驗證');
        param.userId = userInfo.id;
        await this.baseUserIdentityEntity.save(param);
        await this.baseSysUserEntity.save({ id: param.userId, verify: 1 });
    }
};
__decorate([
    orm_1.InjectEntityModel(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysUserEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    orm_1.InjectEntityModel(user_identity_1.BaseUserIdentityEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseUserIdentityEntity", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", cache_1.CacheManager)
], BaseApiUserService.prototype, "cacheManager", void 0);
__decorate([
    decorator_1.Inject(),
    __metadata("design:type", Object)
], BaseApiUserService.prototype, "ctx", void 0);
BaseApiUserService = __decorate([
    decorator_1.Provide()
], BaseApiUserService);
exports.BaseApiUserService = BaseApiUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2Uvc2VydmljZS9hcGkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELDRCQUE0QjtBQUM1QiwwREFBbUU7QUFDbkUsMkJBQTJCO0FBQzNCLDREQUFzRTtBQUN0RSwyQ0FBK0M7QUFJL0MsZ0VBQTREO0FBRTVELGtFQUF3RTtBQUV4RTs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUFtQmpEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLE1BQU07O1FBQ1Ysd0JBQXdCO1FBQ3hCLFNBQVM7UUFDVCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDaEQsRUFBRSxFQUFFLE1BQUEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLE1BQU07U0FDMUIsQ0FBQyxDQUFDO1FBQ0ksSUFBSSxhQUFKLElBQUksNEJBQUosSUFBSSxDQUFFLFFBQVEsQ0FBQztRQUNmLElBQUksYUFBSixJQUFJLDRCQUFKLElBQUksQ0FBRSxRQUFRLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLO1FBQ3RCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxNQUFNLElBQUksd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUQsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFakMsTUFBTSxJQUFJLEdB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