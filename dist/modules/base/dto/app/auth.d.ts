/**
 * 登錄參數校驗
 */
export declare class ApiLoginDTO {
    area: string;
    phone: string;
    password: string;
    rememberMe: boolean;
}
export declare class ApiRegisterDTO {
    firstName: string;
    lastName: string;
    area: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    verifyCode: number;
}
export declare class ApiCaptchaDTO {
    area: string;
    phone: string;
}
export declare class ApiForgotDTO {
    area: string;
    phone: string;
    verifyCode: string;
    password: string;
    passwordConfirm: string;
}
export declare class ApiResetPasswordDTO {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    passwordV: number;
}
