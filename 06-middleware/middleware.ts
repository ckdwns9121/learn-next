import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 미들웨어는 모든 요청에 대해 실행됩니다
// 이 파일은 프로젝트 루트에 위치해야 합니다 (src/ 폴더 안이 아닌 루트에)

export function middleware(request: NextRequest) {
  // 1. 요청 정보 로깅
  console.log("🔍 미들웨어 실행됨:", {
    url: request.url,
    method: request.method,
    pathname: request.nextUrl.pathname,
    userAgent: request.headers.get("user-agent"),
    ip: request.ip || "unknown",
  });

  // 2. 특정 경로에 대한 리다이렉트
  if (request.nextUrl.pathname === "/old-page") {
    return NextResponse.redirect(new URL("/new-page", request.url));
  }

  // 3. 인증이 필요한 페이지 보호
  if (request.nextUrl.pathname.startsWith("/protected")) {
    // 쿠키에서 인증 토큰 확인
    const authToken = request.cookies.get("auth-token");

    if (!authToken || authToken.value !== "valid-token") {
      // 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 4. 특정 사용자 에이전트 차단 (예: 봇 차단)
  const userAgent = request.headers.get("user-agent") || "";
  if (userAgent.includes("bad-bot")) {
    return new NextResponse("접근이 거부되었습니다.", { status: 403 });
  }

  // 5. 헤더 추가/수정
  const response = NextResponse.next();

  // 보안 헤더 추가
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 커스텀 헤더 추가
  response.headers.set("X-Middleware-Cache", "no-cache");

  // 6. 쿠키 설정
  response.cookies.set("last-visited", new Date().toISOString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24시간
  });

  return response;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  // 모든 경로에서 미들웨어 실행
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",

    // 특정 경로만 포함하고 싶다면:
    // '/protected/:path*',
    // '/admin/:path*',
    // '/api/:path*'
  ],
};
