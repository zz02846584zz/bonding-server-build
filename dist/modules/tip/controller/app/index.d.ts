import { BaseController } from '@cool-midway/core';
import { TipApiService } from '../../service/tipApi';
import { TipEntity } from '../../entity';
/**
 * 描述
 */
export declare class TipApiController extends BaseController {
    tipApiService: TipApiService;
    tipEntity: TipEntity;
    /**
     * 今日小之日
     */
    today(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 今日小之日
     */
    myTips(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
