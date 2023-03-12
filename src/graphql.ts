
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

export interface CreatePostInput {
    title: string;
    description: string;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    id: number;
}

export interface CreateCommentInput {
    exampleField: number;
}

export interface UpdateCommentInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface Comment {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    message: string;
}

export interface Post {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    title: string;
    description: string;
    published: string;
    publishedAt: string;
    slug: string;
    trashed: string;
    postMedia: string;
    postMediaType: string;
}

export interface User {
    id: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    firstName: string;
    lastName: string;
    email: string;
    password?: Nullable<string>;
    isActive?: Nullable<boolean>;
    role: string;
}

export interface UserRegisterResponseDto {
    status: number;
    message: string;
    user?: Nullable<User>;
    token?: Nullable<string>;
}

export interface UserLoginResponseDto {
    status: number;
    message: string;
    token: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAdmin(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAuthLoggedUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    post(id: number): Post | Promise<Post>;
    comments(): Comment[] | Promise<Comment[]>;
    comment(id: number): Comment | Promise<Comment>;
}

export interface IMutation {
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    localLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    createPost(createPostInput: CreatePostInput): string | Promise<string>;
    updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;
    removePost(id: number): Post | Promise<Post>;
    createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;
    updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;
    removeComment(id: number): Comment | Promise<Comment>;
}

export type DateTime = any;
type Nullable<T> = T | null;
