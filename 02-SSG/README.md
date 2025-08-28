# 02. SSG (Static Site Generation) 학습

이 폴더는 Next.js의 Static Site Generation을 학습하기 위한 예제입니다.

## 특징

- **SSG**: 빌드 시점에 모든 페이지를 미리 생성
- **빠른 로딩**: 매우 빠른 페이지 로딩 속도
- **CDN 배포**: 전 세계 어디서나 빠른 접근
- **정적 콘텐츠**: 데이터가 자주 변경되지 않는 콘텐츠에 적합

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3002)
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 주요 코드

- `src/app/page.tsx`: SSG 메인 페이지
- `src/app/layout.tsx`: 레이아웃 컴포넌트
- `src/app/globals.css`: 전역 스타일

## 학습 포인트

1. `next: { revalidate: 3600 }` 옵션으로 ISR 설정
2. 빌드 시점에 데이터를 가져와 정적 페이지 생성
3. 캐시된 페이지의 빠른 로딩
4. CDN을 통한 전 세계 배포
