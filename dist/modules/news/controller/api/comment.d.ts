import { BaseController } from '@cool-midway/core';
import { NewsCommentApiService } from '../../service/api/comment';
/**
 * 描述
 */
export declare class NewsCommentApiController extends BaseController {
    newsCommentService: NewsCommentApiService;
    /**
     * 登錄
     * @param param
     */
    child(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
