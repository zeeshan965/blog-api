
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

export interface CreateCategoryInput {
    title: string;
    description: string;
}

export interface UpdateCategoryInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    id: string;
}

export interface CreatePostInput {
    title: string;
    description: string;
    published: boolean;
    categories?: Nullable<number[]>;
    mediaType?: Nullable<string>;
    mediaFile?: Nullable<Upload>;
}

export interface UpdatePostInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    published?: Nullable<boolean>;
    categories?: Nullable<number[]>;
    mediaType?: Nullable<string>;
    mediaFile?: Nullable<Upload>;
    id: string;
    slug: string;
}

export interface FileInput {
    file: Upload;
}

export interface CreateCommentInput {
    message: string;
    postId?: Nullable<string>;
    parentId?: Nullable<string>;
}

export interface UpdateCommentInput {
    message?: Nullable<string>;
    postId?: Nullable<string>;
    parentId?: Nullable<string>;
    id: string;
}

export interface UserJwtPayloadDto {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<string>;
    password?: Nullable<string>;
    isActive?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface Comment {
    id: string;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    message?: Nullable<string>;
    author?: Nullable<UserJwtPayloadDto>;
    likes?: Nullable<number>;
    dislikes?: Nullable<number>;
    post?: Nullable<Post>;
    parent?: Nullable<Comment>;
    replies?: Nullable<Comment[]>;
    reply: Comment[];
}

export interface Category {
    id: string;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Post {
    id: string;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    title: string;
    description: string;
    published: boolean;
    publishedAt?: Nullable<DateTime>;
    slug?: Nullable<string>;
    trashed?: Nullable<DateTime>;
    postMedia?: Nullable<string>;
    mediaId?: Nullable<string>;
    postMediaType?: Nullable<string>;
    author?: Nullable<UserJwtPayloadDto>;
}

export interface UserRegisterResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    total?: Nullable<number>;
    user?: Nullable<UserJwtPayloadDto>;
    token?: Nullable<string>;
}

export interface UserLoginResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    total?: Nullable<number>;
    token: string;
}

export interface PostResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    total?: Nullable<number>;
    post?: Nullable<Post>;
    posts?: Nullable<Post[]>;
}

export interface CategoryResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    total?: Nullable<number>;
    category?: Nullable<Category>;
    categories?: Nullable<Category[]>;
}

export interface CommentResponseDto {
    status?: Nullable<number>;
    message?: Nullable<string>;
    deleted?: Nullable<boolean>;
    total?: Nullable<number>;
    comment?: Nullable<Comment>;
    comments?: Nullable<Comment[]>;
}

export interface IQuery {
    index(): string | Promise<string>;
    getUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAdmin(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    getAuthLoggedUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtStrategyGetUser(): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    findAllCategories(): CategoryResponseDto | Promise<CategoryResponseDto>;
    findOneCategory(id: string): CategoryResponseDto | Promise<CategoryResponseDto>;
    searchCategories(search: string): CategoryResponseDto | Promise<CategoryResponseDto>;
    list(page: number, limit: number): PostResponseDto | Promise<PostResponseDto>;
    findAllPosts(): PostResponseDto | Promise<PostResponseDto>;
    findOnePost(id: string): PostResponseDto | Promise<PostResponseDto>;
    searchPost(search: string): PostResponseDto | Promise<PostResponseDto>;
    getFiles(): string[] | Promise<string[]>;
    removeFile(id: string): boolean | Promise<boolean>;
    elasticSearchMigration(): string | Promise<string>;
    findOneComment(id: string): CommentResponseDto | Promise<CommentResponseDto>;
    getPostComments(postId: string): CommentResponseDto | Promise<CommentResponseDto>;
}

export interface IMutation {
    register(data: UserRegisterReqDto): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    login(email: string, password: string): UserLoginResponseDto | Promise<UserLoginResponseDto>;
    localStrategyLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    localStrategyGetUser(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    jwtLogin(username: string, password: string): UserRegisterResponseDto | Promise<UserRegisterResponseDto>;
    createCategory(createCategoryInput: CreateCategoryInput): CategoryResponseDto | Promise<CategoryResponseDto>;
    updateCategory(updateCategoryInput: UpdateCategoryInput): CategoryResponseDto | Promise<CategoryResponseDto>;
    removeCategory(id: string): CategoryResponseDto | Promise<CategoryResponseDto>;
    createPost(createPostInput: CreatePostInput): PostResponseDto | Promise<PostResponseDto>;
    updatePost(updatePostInput: UpdatePostInput): PostResponseDto | Promise<PostResponseDto>;
    removePost(id: string): PostResponseDto | Promise<PostResponseDto>;
    uploadFile(fileInput: FileInput): string | Promise<string>;
    createComment(createCommentInput: CreateCommentInput): CommentResponseDto | Promise<CommentResponseDto>;
    updateComment(updateCommentInput: UpdateCommentInput): CommentResponseDto | Promise<CommentResponseDto>;
    removeComment(id: string): CommentResponseDto | Promise<CommentResponseDto>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
