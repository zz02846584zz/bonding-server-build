import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleCommentEntity } from '../../entity/comment';
/**
 * 描述
 */
export declare class NewsCommentAdminService extends BaseService {
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    /**
     * 分頁查詢
     * @param query
     */
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 列表查詢
     * @param param
     */
    list(param: any): Promise<any>;
}
