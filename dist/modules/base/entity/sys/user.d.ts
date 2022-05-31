import { BaseEntity } from '@cool-midway/core';
/**
 * 系統用戶
 */
export declare class BaseSysUserEntity extends BaseEntity {
    departmentId: number;
    firstName: string;
    lastName: string;
    username: string;
    birthday: string;
    id_card: string;
    phone: string;
    password: string;
    passwordV: number;
    headImg: string;
    email: string;
    gender: number;
    remark: string;
    intro: string;
    status: number;
    verify: number;
    departmentName: string;
    roleIdList: number[];
    socketId: string;
}
