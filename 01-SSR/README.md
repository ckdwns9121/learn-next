# 01. SSR (Server-Side Rendering) 학습

이 폴더는 Next.js의 Server-Side Rendering을 학습하기 위한 예제입니다.

## 특징

- **SSR**: 매 요청마다 서버에서 새로운 HTML을 생성
- **실시간 데이터**: 항상 최신 데이터 반영
- **SEO 최적화**: 검색 엔진 최적화에 유리
- **초기 로딩**: 빠른 초기 로딩 속도

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3001)
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 주요 코드

- `src/app/page.tsx`: SSR 메인 페이지
- `src/app/layout.tsx`: 레이아웃 컴포넌트
- `src/app/globals.css`: 전역 스타일

## 학습 포인트

1. `cache: 'no-store'` 옵션으로 SSR 강제
2. `async` 컴포넌트를 사용한 서버 사이드 데이터 페칭
3. `Suspense`를 사용한 로딩 상태 처리
