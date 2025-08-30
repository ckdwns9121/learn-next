# Next.js Server Action 심화 학습

이 프로젝트는 Next.js 14의 Server Action을 깊이 있게 학습할 수 있는 포괄적인 예제입니다.

## 🚀 주요 기능

### 1. 기본 Server Action
- **사용자 관리**: 사용자 생성, 조회, 삭제
- **게시물 관리**: 게시물 생성, 조회, 삭제, 상태 변경
- **댓글 관리**: 댓글 생성 및 관리

### 2. 고급 Server Action 패턴
- **조건부 액션**: 사용자 권한에 따른 동적 동작
- **배치 처리**: 여러 항목을 효율적으로 처리
- **점진적 처리**: 진행률 추적 및 사용자 피드백
- **파일 업로드**: 유효성 검사 및 처리
- **검색 및 필터링**: 복잡한 쿼리와 페이지네이션
- **스마트 캐시 무효화**: 상황별 최적화된 캐시 관리

## 🛠️ 기술 스택

- **Next.js 14**: App Router 기반
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 스타일링
- **Zod**: 스키마 검증
- **React Hook Form**: 폼 관리

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── components/
│   │   ├── UserManagement.tsx    # 사용자 관리 컴포넌트
│   │   ├── PostManagement.tsx    # 게시물 관리 컴포넌트
│   │   └── AdvancedActions.tsx   # 고급 패턴 컴포넌트
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── actions.ts               # 기본 Server Action
│   └── advanced-actions.ts      # 고급 Server Action
└── types/
    └── index.ts                 # 타입 정의
```

## 🔧 설치 및 실행

1. 의존성 설치:
```bash
npm install
# 또는
pnpm install
```

2. 개발 서버 실행:
```bash
npm run dev
# 또는
pnpm dev
```

3. 브라우저에서 `http://localhost:3005` 접속

## 📚 학습 포인트

### Server Action 기본 개념
- `'use server'` 지시어 사용법
- FormData를 통한 데이터 전송
- 서버 사이드 유효성 검사
- 에러 처리 및 사용자 피드백

### 고급 패턴
- **권한 기반 액션**: 사용자 역할에 따른 조건부 실행
- **배치 처리**: 대량 데이터 효율적 처리
- **진행률 추적**: 긴 작업의 상태 모니터링
- **파일 처리**: 업로드 및 유효성 검사
- **검색 최적화**: 복잡한 필터링과 페이지네이션
- **캐시 전략**: 상황별 최적화된 캐시 무효화

### 실무 적용 사례
- **관리자 대시보드**: 사용자 및 콘텐츠 관리
- **콘텐츠 관리 시스템**: 게시물 및 댓글 관리
- **파일 관리**: 업로드 및 검증
- **검색 시스템**: 고급 필터링 및 검색

## 🎯 핵심 Server Action 예제

### 1. 사용자 생성
```typescript
export async function createUser(formData: FormData) {
  // Zod를 통한 유효성 검사
  const validatedData = createUserSchema.parse(rawData);
  
  // 비즈니스 로직 실행
  const newUser = { /* ... */ };
  
  // 캐시 무효화
  revalidatePath('/users');
  revalidateTag('users');
  
  return { success: true, data: newUser };
}
```

### 2. 조건부 액션
```typescript
export async function conditionalAction(userId: string, action: string) {
  const userRole = await getUserRole(userId);
  
  if (action === 'delete_user' && userRole !== 'admin') {
    return { success: false, error: '권한이 없습니다' };
  }
  
  // 권한이 있는 경우에만 실행
  return { success: true };
}
```

### 3. 배치 처리
```typescript
export async function batchProcess(items: string[], action: string) {
  let processed = 0;
  let failed = 0;
  
  for (const item of items) {
    try {
      await processItem(item, action);
      processed++;
    } catch (error) {
      failed++;
    }
  }
  
  return { processed, failed };
}
```

## 🔍 캐시 무효화 전략

### 상황별 캐시 관리
- **생성**: 관련된 모든 경로와 태그 무효화
- **수정**: 특정 엔티티와 관련 경로만 무효화
- **삭제**: 관련된 모든 경로 무효화

```typescript
export async function smartRevalidation(action, entityType, entityId) {
  switch (action) {
    case 'create':
      revalidatePath('/dashboard');
      revalidatePath(`/${entityType}s`);
      revalidateTag(entityType + 's');
      break;
    case 'update':
      if (entityId) {
        revalidatePath(`/${entityType}s/${entityId}`);
      }
      revalidatePath(`/${entityType}s`);
      break;
  }
}
```

## 🚨 주의사항

1. **보안**: 실제 프로젝트에서는 적절한 인증/인가 구현 필요
2. **데이터베이스**: 현재는 메모리 기반 저장소, 실제로는 데이터베이스 연동 필요
3. **에러 처리**: 프로덕션 환경에서는 더 견고한 에러 처리 구현 필요
4. **성능**: 대용량 데이터 처리 시 적절한 최적화 필요

## 📖 추가 학습 자료

- [Next.js Server Actions 공식 문서](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Zod 스키마 검증](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 기여

이 프로젝트는 학습 목적으로 제작되었습니다. 개선 사항이나 버그 리포트는 언제든 환영합니다!

---

**Next.js Server Action을 통해 서버와 클라이언트 간의 효율적인 데이터 흐름을 경험해보세요! 🚀**
