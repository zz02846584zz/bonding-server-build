import { BaseController } from '@cool-midway/core';
import { NewsArticleAdminService } from '../../service/admin/article';
/**
 * 描述
 */
export declare class NewsArticleAdminController extends BaseController {
    newsArticleAdminService: NewsArticleAdminService;
    /**
     * 分類
     * @param param
     */
    getArticleCategory(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
