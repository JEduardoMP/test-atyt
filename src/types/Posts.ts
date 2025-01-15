export interface PostWithCommentCount {
  id: number;
  title: string;
  body: string;
  userId: number;
  commentCount: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}