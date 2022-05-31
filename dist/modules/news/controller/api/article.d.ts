import { BaseController } from '@cool-midway/core';
import { NewsArticleApiService } from '../../service/api/article';
import { Context } from '@midwayjs/koa';
/**
 * 描述
 */
export declare class NewsArticleController extends BaseController {
    newsArticleApiService: NewsArticleApiService;
    ctx: Context;
    /**
     * 分類
     * @param param
     */
    getArticleCategory(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 分類
     * @param param
     */
    getArticle(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 分類
     * @param param
     */
    articleLike(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
