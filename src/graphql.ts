
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserRegisterReqDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    role: string;
}

export interface UserLoginResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    user?: Nullable<User>;
}

export interface IQuery {
    index(): string | Promise<string>;
    register(data: UserRegisterReqDto): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
}

type Nullable<T> = T | null;
