import { BaseEntity } from '@cool-midway/core';
/**
 * 描述
 */
export declare class TipEntity extends BaseEntity {
    title: string;
    content: string;
    publishDate: string;
    status: string;
    industryCategoryIdList: number;
}
