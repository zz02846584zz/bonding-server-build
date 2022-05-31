import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { TipEntity } from '../entity';
import { TipViewEntity } from '../entity/view';
import { Context } from 'koa';
/**
 * 描述
 */
export declare class TipApiService extends BaseService {
    tipEntity: Repository<TipEntity>;
    tipViewEntity: Repository<TipViewEntity>;
    ctx: Context;
    /**
     * 取得小知識列表
     *
     */
    myList(): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 取得今日小知識
     *
     */
    today(): Promise<TipEntity>;
    todayFormat(): Promise<string>;
}
