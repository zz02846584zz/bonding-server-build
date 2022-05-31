import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { UserCollectionEntity } from '../entity/collection';
import { NewsArticleEntity } from '../../news/entity/article';
import { TipEntity } from '../../tip/entity';
/**
 * 描述
 */
export declare class UserCollectionApiService extends BaseService {
    userCollectionEntity: Repository<UserCollectionEntity>;
    newsArticleEntity: Repository<NewsArticleEntity>;
    tipEntity: Repository<TipEntity>;
    ctx: any;
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    add(query: any): Promise<{
        id: number;
    }>;
    /**
     * 刪除
     * @param query
     */
    delete(ids: any): Promise<void>;
}
