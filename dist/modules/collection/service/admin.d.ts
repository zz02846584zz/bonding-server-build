import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { UserCollectionEntity } from '../entity/collection';
/**
 * 描述
 */
export declare class UserCollectionAdminService extends BaseService {
    userCollectionEntity: Repository<UserCollectionEntity>;
}
