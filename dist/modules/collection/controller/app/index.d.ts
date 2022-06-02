import { BaseController } from '@cool-midway/core';
import { UserCollectionEntity } from '../../entity/collection';
import { UserCollectionApiService } from '../../service/api';
import { Repository } from 'typeorm';
/**
 * 描述
 */
export declare class UserCollectionApiController extends BaseController {
    userCollectionEntity: Repository<UserCollectionEntity>;
    userCollectionApiService: UserCollectionApiService;
}
