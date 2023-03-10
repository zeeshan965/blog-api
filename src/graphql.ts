
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

export interface CreateAttachmentInput {
    exampleField: number;
}

export interface UpdateAttachmentInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface CreateCommentInput {
    exampleField: number;
}

export interface UpdateCommentInput {
    exampleField?: Nullable<number>;
    id: number;
}

export interface User {
    id: number;
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
    user: User;
}

export interface UserLoginResponseDto {
    status: number;
    message: string;
    token: string;
}

export interface Post {
    id: number;
    title: string;
    description: string;
}

export interface Attachment {
    exampleField: number;
}

export interface Comment {
    exampleField: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAdmin(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAuthLoggedUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    post(id: number): Post | Promise<Post>;
    attachment(id: number): Attachment | Promise<Attachment>;
    comments(): Comment[] | Promise<Comment[]>;
    comment(id: number): Comment | Promise<Comment>;
}

export interface IMutation {
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    localLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    createPost(createPostInput: CreatePostInput): string | Promise<string>;
    updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;
    removePost(id: number): Post | Promise<Post>;
    createAttachment(createAttachmentInput: CreateAttachmentInput): Attachment | Promise<Attachment>;
    updateAttachment(updateAttachmentInput: UpdateAttachmentInput): Attachment | Promise<Attachment>;
    removeAttachment(id: number): Attachment | Promise<Attachment>;
    createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;
    updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;
    removeComment(id: number): Comment | Promise<Comment>;
}

type Nullable<T> = T | null;
