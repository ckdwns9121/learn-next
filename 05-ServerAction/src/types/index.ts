// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// 게시물 타입
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 댓글 타입
export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// 폼 데이터 타입
export interface CreateUserFormData {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface CreatePostFormData {
  title: string;
  content: string;
  published: boolean;
}

export interface CreateCommentFormData {
  content: string;
  postId: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Server Action 결과 타입
export interface ServerActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
}
