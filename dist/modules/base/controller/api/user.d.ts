import { BaseController, CoolEps } from '@cool-midway/core';
import { BaseApiUserService } from '../../service/api/user';
import { BaseSysParamService } from '../../service/sys/param';
import { Context } from '@midwayjs/koa';
import { ApiResetPasswordDTO } from '../../dto/app/auth';
/**
 * 不需要登錄的後台接口
 */
export declare class BaseApiUserController extends BaseController {
    baseApiUserService: BaseApiUserService;
    baseSysParamService: BaseSysParamService;
    ctx: Context;
    eps: CoolEps;
    /**
     * 取得個人資料
     */
    person(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 重設密碼
     */
    resetPassword(param: ApiResetPasswordDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 身份驗證
     */
    identityCert(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 綁定Email
     */
    bindingEmail(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
