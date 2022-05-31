import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IndustryCategoryEntity } from '../../entity/category';
/**
 * 描述
 */
export declare class IndustryCategoryApiService extends BaseService {
    industryCategoryEntity: Repository<IndustryCategoryEntity>;
}
