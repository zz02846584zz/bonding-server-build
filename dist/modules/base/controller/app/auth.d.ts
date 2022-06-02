import { BaseController } from '@cool-midway/core';
import { BaseApiAuthService } from '../../service/api/auth';
import { ApiLoginDTO, ApiRegisterDTO, ApiCaptchaDTO, ApiForgotDTO } from '../../dto/app/auth';
/**
 * 商品
 */
export declare class AppAuthController extends BaseController {
    baseApiAuthService: BaseApiAuthService;
    /**
     * 登錄
     * @param login
     */
    login(login: ApiLoginDTO): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 註冊
     * @param register
     */
    register(register: ApiRegisterDTO): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 註冊
     * @param forgot
     */
    forgot(forgot: ApiForgotDTO): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 獲得驗證碼
     * @param captcha
     */
    captcha(captcha: ApiCaptchaDTO): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 刷新token
     */
    refreshToken(refreshToken: string): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 退出
     */
    logout(): Promise<{
        code: import("@cool-midway/core").RESCODE; /**
         * 退出
         */
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
