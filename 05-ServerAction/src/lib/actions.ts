'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ServerActionResult, CreateUserFormData, CreatePostFormData, CreateCommentFormData, User, Post, Comment } from '@/types';

// 사용자 생성 스키마
const createUserSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다').max(50, '이름은 최대 50자까지 가능합니다'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  role: z.enum(['user', 'admin'], { message: '유효한 역할을 선택해주세요' })
});

// 게시물 생성 스키마
const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(100, '제목은 최대 100자까지 가능합니다'),
  content: z.string().min(10, '내용은 최소 10자 이상이어야 합니다').max(1000, '내용은 최대 1000자까지 가능합니다'),
  published: z.boolean()
});

// 댓글 생성 스키마
const createCommentSchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해주세요').max(500, '댓글은 최대 500자까지 가능합니다'),
  postId: z.string().min(1, '게시물 ID가 필요합니다')
});

// 메모리 기반 데이터 저장소 (실제 프로젝트에서는 데이터베이스 사용)
let users: User[] = [];
let posts: Post[] = [];
let comments: Comment[] = [];

// 사용자 생성 Server Action
export async function createUser(
  formData: FormData
): Promise<ServerActionResult<User>> {
  try {
    // FormData에서 데이터 추출
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as 'user' | 'admin'
    };

    // Zod 스키마로 유효성 검사
    const validatedData = createUserSchema.parse(rawData);

    // 이메일 중복 확인
    if (users.find(user => user.email === validatedData.email)) {
      return {
        success: false,
        error: '이미 존재하는 이메일 주소입니다'
      };
    }

    // 새 사용자 생성
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);

    // 캐시 무효화
    revalidatePath('/users');
    revalidateTag('users');

    return {
      success: true,
      data: newUser
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string[]> = {};
      error.errors.forEach(err => {
        const field = err.path[0] as string;
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(err.message);
      });

      return {
        success: false,
        validationErrors
      };
    }

    return {
      success: false,
      error: '사용자 생성 중 오류가 발생했습니다'
    };
  }
}

// 게시물 생성 Server Action
export async function createPost(
  formData: FormData
): Promise<ServerActionResult<Post>> {
  try {
    const rawData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      published: formData.get('published') === 'true'
    };

    const validatedData = createPostSchema.parse(rawData);

    // 실제 프로젝트에서는 인증된 사용자 ID를 사용
    const authorId = 'user_1'; // 임시 사용자 ID

    const newPost: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    posts.push(newPost);

    // 캐시 무효화
    revalidatePath('/posts');
    revalidateTag('posts');

    return {
      success: true,
      data: newPost
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string[]> = {};
      error.errors.forEach(err => {
        const field = err.path[0] as string;
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(err.message);
      });

      return {
        success: false,
        validationErrors
      };
    }

    return {
      success: false,
      error: '게시물 생성 중 오류가 발생했습니다'
    };
  }
}

// 댓글 생성 Server Action
export async function createComment(
  formData: FormData
): Promise<ServerActionResult<Comment>> {
  try {
    const rawData = {
      content: formData.get('content') as string,
      postId: formData.get('postId') as string
    };

    const validatedData = createCommentSchema.parse(rawData);

    // 게시물 존재 확인
    if (!posts.find(post => post.id === validatedData.postId)) {
      return {
        success: false,
        error: '존재하지 않는 게시물입니다'
      };
    }

    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedData,
      authorId: 'user_1', // 임시 사용자 ID
      createdAt: new Date(),
      updatedAt: new Date()
    };

    comments.push(newComment);

    // 캐시 무효화
    revalidatePath(`/posts/${validatedData.postId}`);
    revalidateTag('comments');

    return {
      success: true,
      data: newComment
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string[]> = {};
      error.errors.forEach(err => {
        const field = err.path[0] as string;
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(err.message);
      });

      return {
        success: false,
        validationErrors
      };
    }

    return {
      success: false,
      error: '댓글 생성 중 오류가 발생했습니다'
    };
  }
}

// 사용자 삭제 Server Action
export async function deleteUser(userId: string): Promise<ServerActionResult<void>> {
  try {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      return {
        success: false,
        error: '존재하지 않는 사용자입니다'
      };
    }

    // 사용자 삭제
    users.splice(userIndex, 1);

    // 관련 게시물과 댓글도 삭제 (실제로는 외래 키 제약 조건 사용)
    posts = posts.filter(post => post.authorId !== userId);
    comments = comments.filter(comment => comment.authorId !== userId);

    // 캐시 무효화
    revalidatePath('/users');
    revalidateTag('users');

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: '사용자 삭제 중 오류가 발생했습니다'
    };
  }
}

// 게시물 삭제 Server Action
export async function deletePost(postId: string): Promise<ServerActionResult<void>> {
  try {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      return {
        success: false,
        error: '존재하지 않는 게시물입니다'
      };
    }

    // 게시물 삭제
    posts.splice(postIndex, 1);

    // 관련 댓글도 삭제
    comments = comments.filter(comment => comment.postId !== postId);

    // 캐시 무효화
    revalidatePath('/posts');
    revalidateTag('posts');

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: '게시물 삭제 중 오류가 발생했습니다'
    };
  }
}

// 게시물 상태 토글 Server Action
export async function togglePostStatus(postId: string): Promise<ServerActionResult<Post>> {
  try {
    const post = posts.find(p => p.id === postId);
    if (!post) {
      return {
        success: false,
        error: '존재하지 않는 게시물입니다'
      };
    }

    // 게시물 상태 토글
    post.published = !post.published;
    post.updatedAt = new Date();

    // 캐시 무효화
    revalidatePath('/posts');
    revalidateTag('posts');

    return {
      success: true,
      data: post
    };
  } catch (error) {
    return {
      success: false,
      error: '게시물 상태 변경 중 오류가 발생했습니다'
    };
  }
}

// 데이터 조회 함수들
export async function getUsers(): Promise<User[]> {
  return users;
}

export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getComments(): Promise<Comment[]> {
  return comments;
}

// 특정 게시물 조회
export async function getPost(postId: string): Promise<Post | null> {
  return posts.find(post => post.id === postId) || null;
}

// 특정 게시물의 댓글 조회
export async function getPostComments(postId: string): Promise<Comment[]> {
  return comments.filter(comment => comment.postId === postId);
}
