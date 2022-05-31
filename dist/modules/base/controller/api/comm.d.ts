import { BaseController, CoolEps } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { CoolFile } from '@cool-midway/file';
/**
 * 不需要登录的后台接口
 */
export declare class BaseAppCommController extends BaseController {
    coolFile: CoolFile;
    ctx: Context;
    eps: CoolEps;
    /**
     * 实体信息与路径
     * @returns
     */
    getEps(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文件上传
     */
    upload(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 文件上传模式，本地或者云存储
     */
    uploadMode(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
