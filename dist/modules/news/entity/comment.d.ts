import { BaseEntity } from '@cool-midway/core';
/**
 * 描述
 */
export declare class NewsArticleCommentEntity extends BaseEntity {
    articleId: number;
    userId: number;
    content: string;
    likeCount: number;
    parentId: number;
    publishIp: string;
    isDelete: boolean;
}
