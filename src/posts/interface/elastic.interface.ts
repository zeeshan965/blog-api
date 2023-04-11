export interface PostSearchBody {
  userId: string;
  firstName: string;
  lastName: string;
  id: string;
  postTitle: string;
  postDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}

export interface UpdatePost {
  id: string;
  postDescription?: string;
  postTitle?: string;
}