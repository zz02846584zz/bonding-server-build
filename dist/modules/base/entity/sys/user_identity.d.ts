import { BaseEntity } from '@cool-midway/core';
/**
 * 描述
 */
export declare class BaseUserIdentityEntity extends BaseEntity {
    userId: number;
    positive: string;
    negative: string;
}
