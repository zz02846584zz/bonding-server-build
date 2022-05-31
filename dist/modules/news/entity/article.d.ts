import { BaseEntity } from '@cool-midway/core';
/**
 * 描述
 */
export declare class NewsArticleEntity extends BaseEntity {
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
}
