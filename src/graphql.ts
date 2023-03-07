
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginResponseDto {
    status: number;
    message: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    login(email: string, password: string): LoginResponseDto | Promise<LoginResponseDto>;
}

type Nullable<T> = T | null;
