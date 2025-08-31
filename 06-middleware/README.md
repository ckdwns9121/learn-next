# 🔧 Next.js 미들웨어 실습

이 프로젝트는 Next.js의 미들웨어 기능을 실습하고 학습할 수 있는 예제입니다.

## 🎯 학습 목표

- Next.js 미들웨어의 기본 개념과 동작 원리 이해
- 미들웨어를 사용한 다양한 기능 구현
- 실제 프로젝트에서 미들웨어 활용 방법 학습

## 🚀 주요 기능

### 1. 요청 로깅

- 모든 요청의 정보를 콘솔에 출력
- URL, 메서드, 경로, 사용자 에이전트, IP 주소 등 기록

### 2. 리다이렉트

- `/old-page` → `/new-page` 자동 리다이렉트
- `NextResponse.redirect()` 사용법 학습

### 3. 인증 보호

- `/protected/*` 경로에 대한 접근 제어
- 쿠키 기반 인증 토큰 검증
- 미인증 사용자 자동 로그인 페이지 이동

### 4. 봇 차단

- 특정 사용자 에이전트 차단
- 보안 강화를 위한 접근 제어

### 5. 보안 헤더 추가

- `X-Frame-Options`: 클릭재킹 공격 방지
- `X-Content-Type-Options`: MIME 타입 스니핑 방지
- `Referrer-Policy`: 리퍼러 정보 전송 정책

### 6. 쿠키 관리

- 방문 시간 기록 (`last-visited`)
- 보안 옵션 설정 (httpOnly, secure, sameSite)

## 📁 프로젝트 구조

```
06-middleware/
├── middleware.ts          # 미들웨어 메인 파일
├── src/
│   └── app/
│       ├── page.tsx              # 메인 페이지
│       ├── login/page.tsx        # 로그인 페이지
│       ├── protected/
│       │   └── dashboard/page.tsx # 보호된 대시보드
│       ├── old-page/page.tsx     # 리다이렉트 테스트
│       ├── new-page/page.tsx     # 리다이렉트 결과
│       ├── headers-test/page.tsx # 헤더 테스트
│       └── cookie-test/page.tsx  # 쿠키 테스트
└── README.md
```

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install
# 또는
yarn install
# 또는
pnpm install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

## 🔍 테스트 방법

### 1. 기본 테스트

1. 홈페이지에서 각 테스트 링크 클릭
2. 개발자 도구 콘솔에서 미들웨어 로그 확인

### 2. 리다이렉트 테스트

1. `/old-page` 접근 시 자동으로 `/new-page`로 이동
2. Network 탭에서 301/302 응답 확인

### 3. 인증 테스트

1. `/login` 페이지에서 로그인 버튼 클릭
2. 쿠키에 `auth-token` 설정 확인
3. `/protected/dashboard` 접근 시도
4. 로그아웃 후 다시 접근하여 차단 확인

### 4. 헤더 테스트

1. `/headers-test` 페이지 접근
2. Network 탭에서 응답 헤더 확인
3. 미들웨어에서 추가된 보안 헤더 확인

### 5. 쿠키 테스트

1. `/cookie-test` 페이지 접근
2. Application 탭에서 `last-visited` 쿠키 확인
3. 페이지 새로고침 시 쿠키 값 변경 확인

## 📚 미들웨어 개념

### 미들웨어란?

- Next.js에서 모든 요청이 처리되기 전에 실행되는 함수
- 요청과 응답을 가로채서 수정, 리다이렉트, 차단 등 수행
- Edge Runtime에서 실행되어 빠른 응답 가능

### 주요 사용 사례

- 인증 및 권한 확인
- 요청/응답 로깅
- 헤더 수정
- 리다이렉트
- 봇 차단
- 지역별 콘텐츠 제공
- A/B 테스트

### 실행 순서

1. 사용자 요청
2. 미들웨어 실행
3. 미들웨어에서 응답 반환 또는 `NextResponse.next()`
4. 페이지 렌더링 또는 API 응답

## 🔧 커스터마이징

### matcher 설정

```typescript
export const config = {
  matcher: [
    // 특정 경로만 포함
    "/protected/:path*",
    "/admin/:path*",

    // 정규식 사용
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### 조건부 미들웨어

```typescript
export function middleware(request: NextRequest) {
  // 특정 조건에 따라 다른 동작 수행
  if (request.nextUrl.pathname.startsWith("/api")) {
    // API 요청 처리
  } else if (request.nextUrl.pathname.startsWith("/admin")) {
    // 관리자 페이지 처리
  }

  return NextResponse.next();
}
```

## 🚨 주의사항

1. **파일 위치**: `middleware.ts`는 프로젝트 루트에 위치해야 함
2. **Edge Runtime**: 미들웨어는 Edge Runtime에서 실행되므로 Node.js API 사용 불가
3. **성능**: 모든 요청에서 실행되므로 가벼운 로직만 포함
4. **디버깅**: 콘솔 로그는 서버 콘솔에서 확인

## 📖 추가 학습 자료

- [Next.js 미들웨어 공식 문서](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Edge Runtime 가이드](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [미들웨어 예제](https://github.com/vercel/next.js/tree/canary/examples/middleware)

## 🤝 기여하기

이 프로젝트에 대한 질문이나 개선 제안이 있으시면 이슈를 생성해 주세요.

---

**Happy Coding! 🎉**
