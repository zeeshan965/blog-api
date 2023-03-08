
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserRegisterReqDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: Nullable<boolean>;
    role: string;
}

export interface UserLoginResponseDto {
    status: number;
    message: string;
    token: string;
}

export interface UserRegisterResponseDto {
    status: number;
    message: string;
    user: User;
}

export interface IQuery {
    index(): string | Promise<string>;
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
}

type Nullable<T> = T | null;
