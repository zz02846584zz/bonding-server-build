import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { ApiResetPasswordDTO } from '../../dto/app/auth';
import { BaseUserIdentityEntity } from '../../entity/sys/user_identity';
/**
 * 系統用戶
 */
export declare class BaseApiUserService extends BaseService {
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    baseUserIdentityEntity: Repository<BaseUserIdentityEntity>;
    cacheManager: CacheManager;
    ctx: Context;
    /**
     * 獲得個人信息
     */
    person(): Promise<BaseSysUserEntity>;
    /**
     * 修改
     * @param param 數據
     */
    personUpdate(param: any): Promise<void>;
    /**
     * 重設密碼
     */
    resetPassword(reset: ApiResetPasswordDTO): Promise<void>;
    /**
     * 根據ID獲得信息
     * @param id
     */
    info(id: any): Promise<BaseSysUserEntity>;
    /**
     * 刪除帳戶
     */
    delete(): Promise<void>;
    /**
     * 綁定Email
     */
    bindingEmail(param: any): Promise<any>;
    /**
     * 身份驗證
     */
    identityCert(param: any): Promise<void>;
}
