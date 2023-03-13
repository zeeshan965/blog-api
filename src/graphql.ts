
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

export interface UserUpdateProfileReqDto {
    profile_image: string;
}

export interface CreatePostInput {
    title: string;
    description: string;
    published: boolean;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    published?: Nullable<boolean>;
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
    published: boolean;
    publishedAt: DateTime;
    slug: string;
    trashed: string;
    postMedia: string;
    postMediaType: string;
}

export interface UserJwtPayloadDto {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<string>;
    password?: Nullable<string>;
    isActive?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface UserRegisterResponseDto {
    status: number;
    message: string;
    user?: Nullable<UserJwtPayloadDto>;
    token?: Nullable<string>;
}

export interface UserLoginResponseDto {
    status: number;
    message: string;
    token: string;
}

export interface PostResponseDto {
    status: number;
    message: string;
    post?: Nullable<Post>;
}

export interface IQuery {
    index(): string | Promise<string>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAdmin(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAuthLoggedUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtStrategyGetUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    post(id: number): Post | Promise<Post>;
    comments(): Comment[] | Promise<Comment[]>;
    comment(id: number): Comment | Promise<Comment>;
}

export interface IMutation {
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    localStrategyLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    localStrategyGetUser(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    updateAvatar(userUpdateProfileReqDto: UserUpdateProfileReqDto): string | Promise<string>;
    createPost(createPostInput: CreatePostInput): PostResponseDto | Promise<PostResponseDto>;
    updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;
    removePost(id: number): Post | Promise<Post>;
    createComment(createCommentInput: CreateCommentInput): Comment | Promise<Comment>;
    updateComment(updateCommentInput: UpdateCommentInput): Comment | Promise<Comment>;
    removeComment(id: number): Comment | Promise<Comment>;
}

export type DateTime = any;
type Nullable<T> = T | null;
