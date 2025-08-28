# 03. ISG (Incremental Static Regeneration) 학습

이 폴더는 Next.js의 Incremental Static Regeneration을 학습하기 위한 예제입니다.

## 특징

- **ISG**: 빌드 시점에 정적 페이지 생성 + 주기적 재생성
- **하이브리드**: SSG의 빠른 속도 + SSR의 최신 데이터
- **백그라운드**: 설정된 시간마다 백그라운드에서 재생성
- **트래픽**: 높은 트래픽 페이지에 적합

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3003)
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 주요 코드

- `src/app/page.tsx`: ISG 메인 페이지
- `src/app/layout.tsx`: 레이아웃 컴포넌트
- `src/app/globals.css`: 전역 스타일

## 학습 포인트

1. `next: { revalidate: 60 }` 옵션으로 1분마다 재검증
2. 빌드 후에도 주기적으로 페이지 재생성
3. 첫 방문자는 캐시된 페이지, 이후 방문자는 최신 데이터
4. 백그라운드에서 자동으로 콘텐츠 업데이트
