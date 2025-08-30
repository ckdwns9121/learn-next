'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ServerActionResult } from '@/types';

// 고급 유효성 검사 스키마
const advancedUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  preferences: z.object({
    newsletter: z.boolean(),
    theme: z.enum(['light', 'dark', 'auto']),
    language: z.enum(['ko', 'en', 'ja'])
  }),
  tags: z.array(z.string()).max(5)
});

// 조건부 Server Action (사용자 역할에 따라 다른 동작)
export async function conditionalAction(
  userId: string,
  action: string,
  data: any
): Promise<ServerActionResult<any>> {
  try {
    // 실제 프로젝트에서는 데이터베이스에서 사용자 정보 조회
    const userRole = 'admin'; // 임시로 admin으로 설정

    switch (action) {
      case 'delete_user':
        if (userRole !== 'admin') {
          return {
            success: false,
            error: '권한이 없습니다. 관리자만 사용자를 삭제할 수 있습니다.'
          };
        }
        // 삭제 로직
        break;

      case 'modify_post':
        if (userRole !== 'admin' && userRole !== 'moderator') {
          return {
            success: false,
            error: '권한이 없습니다. 게시물 수정 권한이 필요합니다.'
          };
        }
        // 수정 로직
        break;

      default:
        return {
          success: false,
          error: '알 수 없는 액션입니다.'
        };
    }

    return {
      success: true,
      data: { message: '액션이 성공적으로 실행되었습니다.' }
    };
  } catch (error) {
    return {
      success: false,
      error: '조건부 액션 실행 중 오류가 발생했습니다.'
    };
  }
}

// 배치 처리 Server Action
export async function batchProcess(
  items: string[],
  action: 'delete' | 'publish' | 'archive'
): Promise<ServerActionResult<{ processed: number; failed: number; errors: string[] }>> {
  try {
    let processed = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const itemId of items) {
      try {
        switch (action) {
          case 'delete':
            // 삭제 로직
            processed++;
            break;
          case 'publish':
            // 발행 로직
            processed++;
            break;
          case 'archive':
            // 아카이브 로직
            processed++;
            break;
        }
      } catch (error) {
        failed++;
        errors.push(`항목 ${itemId}: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
      }
    }

    // 캐시 무효화
    revalidatePath('/dashboard');
    revalidateTag('items');

    return {
      success: true,
      data: { processed, failed, errors }
    };
  } catch (error) {
    return {
      success: false,
      error: '배치 처리 중 오류가 발생했습니다.'
    };
  }
}

// 점진적 처리 Server Action (Streaming)
export async function progressiveProcess(
  items: string[]
): Promise<ServerActionResult<{ progress: number; completed: string[] }>> {
  try {
    const completed: string[] = [];
    const total = items.length;

    for (let i = 0; i < items.length; i++) {
      const itemId = items[i];
      
      // 각 항목 처리 (실제로는 더 복잡한 로직)
      await new Promise(resolve => setTimeout(resolve, 100)); // 시뮬레이션
      
      completed.push(itemId);
      
      // 진행률 계산
      const progress = Math.round(((i + 1) / total) * 100);
      
      // 실제 프로젝트에서는 WebSocket이나 Server-Sent Events를 사용
      console.log(`진행률: ${progress}%`);
    }

    return {
      success: true,
      data: { progress: 100, completed }
    };
  } catch (error) {
    return {
      success: false,
      error: '점진적 처리 중 오류가 발생했습니다.'
    };
  }
}

// 파일 업로드 시뮬레이션 Server Action
export async function uploadFile(
  formData: FormData
): Promise<ServerActionResult<{ filename: string; size: number; url: string }>> {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      return {
        success: false,
        error: '파일이 선택되지 않았습니다.'
      };
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: '파일 크기는 10MB를 초과할 수 없습니다.'
      };
    }

    // 허용된 파일 타입
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: '지원되지 않는 파일 타입입니다.'
      };
    }

    // 파일 업로드 시뮬레이션
    const filename = `upload_${Date.now()}_${file.name}`;
    const url = `/uploads/${filename}`;

    // 실제 프로젝트에서는 파일을 서버나 클라우드 스토리지에 저장

    return {
      success: true,
      data: {
        filename,
        size: file.size,
        url
      }
    };
  } catch (error) {
    return {
      success: false,
      error: '파일 업로드 중 오류가 발생했습니다.'
    };
  }
}

// 검색 및 필터링 Server Action
export async function searchAndFilter(
  query: string,
  filters: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: string;
    tags?: string[];
  },
  page: number = 1,
  limit: number = 10
): Promise<ServerActionResult<{
  results: any[];
  total: number;
  page: number;
  totalPages: number;
}>> {
  try {
    // 실제 프로젝트에서는 데이터베이스 쿼리 실행
    const mockResults = [
      { id: '1', title: '검색 결과 1', category: 'tech', status: 'published' },
      { id: '2', title: '검색 결과 2', category: 'design', status: 'draft' },
      { id: '3', title: '검색 결과 3', category: 'tech', status: 'published' }
    ];

    // 필터링 로직 (실제로는 데이터베이스 레벨에서 처리)
    let filteredResults = mockResults.filter(item => {
      if (query && !item.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      return true;
    });

    const total = filteredResults.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        results: paginatedResults,
        total,
        page,
        totalPages
      }
    };
  } catch (error) {
    return {
      success: false,
      error: '검색 및 필터링 중 오류가 발생했습니다.'
    };
  }
}

// 캐시 무효화 전략을 보여주는 Server Action
export async function smartRevalidation(
  action: 'create' | 'update' | 'delete',
  entityType: 'user' | 'post' | 'comment',
  entityId?: string
): Promise<ServerActionResult<void>> {
  try {
    switch (action) {
      case 'create':
        // 생성 시 관련된 모든 경로와 태그 무효화
        revalidatePath('/dashboard');
        revalidatePath(`/${entityType}s`);
        revalidateTag(entityType + 's');
        revalidateTag('dashboard');
        break;

      case 'update':
        // 업데이트 시 특정 엔티티와 관련 경로만 무효화
        if (entityId) {
          revalidatePath(`/${entityType}s/${entityId}`);
        }
        revalidatePath(`/${entityType}s`);
        revalidateTag(entityType + 's');
        break;

      case 'delete':
        // 삭제 시 관련된 모든 경로 무효화
        revalidatePath('/dashboard');
        revalidatePath(`/${entityType}s`);
        revalidateTag(entityType + 's');
        revalidateTag('dashboard');
        break;
    }

    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: '캐시 무효화 중 오류가 발생했습니다.'
    };
  }
}
