"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 로그인 시뮬레이션 (실제로는 서버에 요청을 보내야 함)
  const handleLogin = () => {
    // 쿠키에 인증 토큰 설정
    document.cookie = "auth-token=valid-token; path=/; max-age=3600";
    setIsLoggedIn(true);

    // 잠시 후 보호된 페이지로 이동
    setTimeout(() => {
      router.push("/protected/dashboard");
    }, 1000);
  };

  // 로그아웃
  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🔑 로그인</h1>

        {!isLoggedIn ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📝 미들웨어 테스트용</h3>
              <p className="text-blue-600 text-sm">
                이 페이지는 실제 로그인이 아닌 미들웨어 테스트를 위한 것입니다. 로그인 버튼을 클릭하면 쿠키에 인증
                토큰이 설정됩니다.
              </p>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              🚀 로그인 (테스트용)
            </button>

            <div className="text-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← 홈으로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-semibold text-green-800">로그인 성공!</h3>
              <p className="text-green-600 text-sm">
                인증 토큰이 설정되었습니다. 잠시 후 보호된 페이지로 이동합니다...
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              🚪 로그아웃
            </button>
          </div>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-700 mb-2">🔍 확인 방법:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 개발자 도구 → Application → Cookies에서 auth-token 확인</li>
            <li>• 로그인 후 /protected/dashboard 접근 시도</li>
            <li>• 로그아웃 후 다시 접근 시도하여 차단 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

