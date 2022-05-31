import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleEntity } from '../../entity/article';
import { NewsArticleCommentEntity } from '../../entity/comment';
import { NewsArticleCategoryEntity } from '../../entity/category';
import { IndustryCategoryEntity } from '../../../industry/entity/category';
/**
 * 描述
 */
export declare class NewsArticleAdminService extends BaseService {
    newsArticleEntity: Repository<NewsArticleEntity>;
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    newsArticleCategoryEntity: Repository<NewsArticleCategoryEntity>;
    industryCategoryEntity: Repository<IndustryCategoryEntity>;
    ctx: any;
    /**
     * 取得內容
     * @param query
     */
    info(id: any): Promise<{
        categoryId: any;
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
        categoryIdList: number[];
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
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 新增
     * @param param
     */
    update(param: any): Promise<any>;
    getToday(): string;
    /**
     * 刪除
     * @param ids
     */
    delete(ids: any): Promise<void>;
    /**
     * 删除子菜单
     * @param id
     */
    private delChildCat;
    /**
     * 關聯評論
     * @param ids
     */
    getCommentByArticleId({ articleId, parent }: {
        articleId: any;
        parent?: boolean;
    }): Promise<any>;
    /**
     * 關聯分類
     * @param ids
     */
    getCategoryByArticleId(article: any): Promise<any>;
    /**
     * 更新小知識分類關係
     * @param tip
     */
    updateArticleCategory(article: any): Promise<void>;
}
