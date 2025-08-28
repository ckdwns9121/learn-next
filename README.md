# Next.js 렌더링 방식 및 라우팅 학습 프로젝트

이 프로젝트는 Next.js의 다양한 렌더링 방식과 동적 라우팅을 체계적으로 학습하기 위한 예제 모음입니다.

## 📁 프로젝트 구조

```
learn-next/
├── 01-SSR/                 # Server-Side Rendering 학습
│   ├── src/app/
│   ├── package.json
│   └── README.md
├── 02-SSG/                 # Static Site Generation 학습
│   ├── src/app/
│   ├── package.json
│   └── README.md
├── 03-ISG/                 # Incremental Static Regeneration 학습
│   ├── src/app/
│   ├── package.json
│   └── README.md
├── 04-Dynamic-Router/      # Dynamic Router 학습
│   ├── src/app/
│   ├── package.json
│   └── README.md
└── README.md               # 이 파일
```

## 🚀 학습 주제

### 1. SSR (Server-Side Rendering)

- **포트**: 3001
- **특징**: 매 요청마다 서버에서 새로운 HTML 생성
- **사용 사례**: 실시간 데이터가 필요한 페이지, SEO 최적화

### 2. SSG (Static Site Generation)

- **포트**: 3002
- **특징**: 빌드 시점에 모든 페이지 미리 생성
- **사용 사례**: 블로그, 문서 사이트, 마케팅 페이지

### 3. ISG (Incremental Static Regeneration)

- **포트**: 3003
- **특징**: 정적 페이지 + 주기적 재생성
- **사용 사례**: 자주 업데이트되는 콘텐츠, 높은 트래픽 페이지

### 4. Dynamic Router

- **포트**: 3004
- **특징**: URL 파라미터를 통한 동적 라우팅
- **사용 사례**: 사용자 프로필, 블로그 포스트, 제품 상세 페이지

## 🛠️ 실행 방법

각 폴더에서 개별적으로 실행할 수 있습니다:

```bash
# 예시: SSR 학습 실행
cd 01-SSR
npm install
npm run dev

# 브라우저에서 http://localhost:3001 접속
```

## 📚 학습 순서 권장

1. **01-SSR**: 기본적인 서버 사이드 렌더링 이해
2. **02-SSG**: 정적 사이트 생성의 장점 파악
3. **03-ISG**: 하이브리드 방식의 활용법 학습
4. **04-Dynamic-Router**: 동적 라우팅으로 복잡한 구조 구현

## 🔧 기술 스택

- **Next.js 14**: App Router 사용
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 빠른 스타일링
- **ESLint**: 코드 품질 관리

## 📖 추가 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [App Router 가이드](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Routing](https://nextjs.org/docs/app/building-your-application/routing)

## 🤝 기여하기

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선사항이나 버그 리포트는 언제든 환영합니다!

---

**Happy Learning! 🎉**
