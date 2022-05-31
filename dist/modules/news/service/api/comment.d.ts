import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleCommentEntity } from '../../entity/comment';
import { NewsArticleEntity } from '../../entity/article';
/**
 * 描述
 */
export declare class NewsCommentApiService extends BaseService {
    newsArticleEntity: Repository<NewsArticleEntity>;
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    ctx: any;
    /**
     * 分页查询
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
    detectChild(list: any): Promise<void>;
    /**
     * 取得子項目
     * @param query
     */
    child(param: any): Promise<any>;
    /**
     * 新增
     * @param query
     */
    add(query: any): Promise<{
        id: number;
    }>;
    /**
     * 修改
     * @param query
     */
    update(query: any): Promise<void>;
    /**
     * 刪除
     * @param ids
     */
    delete(ids: any): Promise<void>;
}
