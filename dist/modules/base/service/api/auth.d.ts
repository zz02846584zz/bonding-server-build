import { BaseService } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { CacheManager } from '@midwayjs/cache';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysUserService } from '../sys/user';
import { BaseSysRoleEntity } from '../../entity/sys/role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { BaseSysRoleService } from '../sys/role';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysMenuService } from '../sys/menu';
import { BaseSysPermsService } from '../sys/perms';
import { BaseSysDepartmentService } from '../sys/department';
import { ApiLoginDTO, ApiRegisterDTO, ApiCaptchaDTO, ApiForgotDTO } from '../../dto/app/auth';
/**
 * 登錄
 */
export declare class BaseApiAuthService extends BaseService {
    cacheManager: CacheManager;
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysRoleEntity: Repository<BaseSysRoleEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    baseSysUserService: BaseSysUserService;
    baseSysRoleService: BaseSysRoleService;
    baseSysPermsService: BaseSysPermsService;
    baseSysMenuService: BaseSysMenuService;
    baseSysDepartmentService: BaseSysDepartmentService;
    ctx: Context;
    coolConfig: any;
    /**
     * 登錄
     * @param login
     */
    login(login: ApiLoginDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    /**
     * 註冊
     * @param register
     */
    register(register: ApiRegisterDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    createRandomString(len: number): string;
    /**
     * 忘記密碼
     */
    forgot(forgot: ApiForgotDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    /**
     * 退出登錄
     */
    logout(): Promise<void>;
    /**
     * 發送手機驗證碼
     * @param captcha 國際區號
     */
    captcha(captcha: ApiCaptchaDTO): Promise<boolean>;
    /**
     * 檢驗手機驗證碼
     * @param phone 手機號
     * @param value 驗證碼
     */
    captchaCheck(phone: any, code: any): Promise<any>;
    /**
     * 生成token
     * @param user 用戶對象
     * @param roleIds 角色集合
     * @param expire 過期
     * @param isRefresh 是否是刷新
     */
    generateToken(user: any, roleIds: any, expire: any, isRefresh?: any): Promise<any>;
    /**
     * 刷新token
     * @param token
     */
    refreshToken(token: string): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: string;
    }>;
}
