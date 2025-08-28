# 04. Dynamic Router 학습

이 폴더는 Next.js의 Dynamic Router를 학습하기 위한 예제입니다.

## 특징

- **동적 세그먼트**: URL 파라미터를 통한 유연한 라우팅
- **중첩 라우팅**: 복잡한 URL 구조 지원
- **SEO 친화적**: 검색 엔진에 최적화된 URL 구조
- **타입 안전성**: TypeScript와 완벽한 통합

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3004)
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 주요 코드

- `src/app/page.tsx`: 메인 페이지 (동적 라우팅 예제 링크)
- `src/app/users/[id]/page.tsx`: 사용자별 동적 페이지
- `src/app/blog/[category]/[id]/page.tsx`: 블로그 카테고리별 포스트
- `src/app/products/[category]/[id]/page.tsx`: 제품 카테고리별 상세

## 학습 포인트

1. `[id]` 형태의 동적 세그먼트 사용법
2. `params` 객체를 통한 URL 파라미터 접근
3. `generateMetadata`를 사용한 동적 메타데이터 생성
4. 중첩된 동적 라우팅 구조
5. `Link` 컴포넌트를 사용한 내비게이션

## 예제 URL

- `/users/1` - 사용자 1의 프로필
- `/blog/tech/1` - 기술 카테고리 1번 포스트
- `/products/electronics/101` - 전자제품 101번 제품
