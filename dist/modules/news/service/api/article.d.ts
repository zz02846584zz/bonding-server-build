import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleEntity } from '../../entity/article';
import { NewsArticleCommentEntity } from '../../entity/comment';
import { NewsArticleCategoryEntity } from '../../entity/category';
import { NewsArticleLikeEntity } from '../../entity/like';
import { NewsArticleViewEntity } from '../../entity/view';
/**
 * 描述
 */
export declare class NewsArticleApiService extends BaseService {
    newsArticleEntity: Repository<NewsArticleEntity>;
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    newsArticleCategoryEntity: Repository<NewsArticleCategoryEntity>;
    newsArticleLikeEntity: Repository<NewsArticleLikeEntity>;
    newsArticleViewEntity: Repository<NewsArticleViewEntity>;
    ctx: any;
    /**
     * 取得內容
     * @param query
     */
    info(query: any): Promise<{
        categoryList: NewsArticleCategoryEntity[];
        userId: number;
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        thumbnail: string;
        publishDate: string;
        viewCount: number;
        commentStatus: boolean;
        isSticky: boolean;
        isEssence: boolean;
        type: string;
        videoUrl: string;
        isDelete: boolean;
        status: string;
        categoryIdList: number[]; /**
         * 取得內容
         * @param query
         */
        commentIdList: number[];
        id: number;
        createTime: Date;
        updateTime: Date;
    }>;
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
    /**
     * 列表查询
     * @param query
     */
    list(): Promise<any>;
    /**
     * 取得分類
     * @param query
     */
    categoryList(): Promise<any>;
    /**
     * 關聯評論
     * @param ids
     */
    getCommentByArticle(article: any): Promise<NewsArticleCommentEntity[]>;
    /**
     * 按讚
     * @param param
     */
    articleLike({ id }: {
        id: any;
    }): Promise<void>;
    /**
     * 按讚
     * @param param
     */
    articleView(id: any): Promise<void>;
}
