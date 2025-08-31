"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieTestPage() {
  const [cookies, setCookies] = useState<Record<string, string>>({});
  const [lastVisited, setLastVisited] = useState<string>("");

  useEffect(() => {
    // 현재 페이지의 모든 쿠키를 가져오기
    const getAllCookies = () => {
      const cookieString = document.cookie;
      const cookieObj: Record<string, string> = {};

      if (cookieString) {
        cookieString.split(";").forEach((cookie) => {
          const [name, value] = cookie.trim().split("=");
          if (name && value) {
            cookieObj[name] = decodeURIComponent(value);
          }
        });
      }

      setCookies(cookieObj);

      // last-visited 쿠키가 있으면 파싱
      if (cookieObj["last-visited"]) {
        try {
          const date = new Date(cookieObj["last-visited"]);
          setLastVisited(date.toLocaleString("ko-KR"));
        } catch (error) {
          setLastVisited("파싱 오류");
        }
      }
    };

    getAllCookies();

    // 쿠키 변경 감지를 위한 인터벌 설정
    const interval = setInterval(getAllCookies, 1000);

    return () => clearInterval(interval);
  }, []);

  // 쿠키 삭제 함수
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    // 쿠키 목록 새로고침
    setTimeout(() => {
      const cookieString = document.cookie;
      const cookieObj: Record<string, string> = {};

      if (cookieString) {
        cookieString.split(";").forEach((cookie) => {
          const [name, value] = cookie.trim().split("=");
          if (name && value) {
            cookieObj[name] = decodeURIComponent(value);
          }
        });
      }

      setCookies(cookieObj);
    }, 100);
  };

  // 쿠키 새로고침
  const refreshCookies = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-800 mb-8">🍪 쿠키 테스트</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔍 미들웨어에서 설정되는 쿠키</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">📅 last-visited 쿠키</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">설정된 값:</p>
                <p className="font-mono text-blue-800">{lastVisited || "아직 설정되지 않음"}</p>
                <p className="text-xs text-blue-600 mt-2">
                  이 쿠키는 미들웨어에서 자동으로 설정되며, 사용자가 마지막으로 방문한 시간을 기록합니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">⚙️ 쿠키 설정 옵션</h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <strong>httpOnly:</strong> true (JavaScript에서 접근 불가)
                </div>
                <div>
                  <strong>secure:</strong> 프로덕션에서만 HTTPS
                </div>
                <div>
                  <strong>sameSite:</strong> lax (CSRF 방지)
                </div>
                <div>
                  <strong>maxAge:</strong> 24시간
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 현재 설정된 모든 쿠키</h2>

          <div className="space-y-4">
            {Object.keys(cookies).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(cookies).map(([name, value]) => (
                  <div key={name} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <div className="flex-1">
                      <span className="font-mono text-sm text-gray-800 font-semibold">{name}:</span>
                      <span className="font-mono text-sm text-gray-600 ml-2">{value}</span>
                    </div>
                    <button
                      onClick={() => deleteCookie(name)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">설정된 쿠키가 없습니다.</div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={refreshCookies}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                🔄 쿠키 새로고침
              </button>

              <button
                onClick={() => {
                  // 모든 쿠키 삭제
                  Object.keys(cookies).forEach((name) => deleteCookie(name));
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                🗑️ 모든 쿠키 삭제
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💡 미들웨어 쿠키 설정 코드</h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
              {`// middleware.ts에서 쿠키 설정
const response = NextResponse.next()

// 쿠키 설정
response.cookies.set('last-visited', new Date().toISOString(), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 // 24시간
})

return response`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-yellow-800 mb-3">🔍 확인 방법:</h3>
          <ul className="text-yellow-700 space-y-2">
            <li>
              • <strong>개발자 도구 → Application → Cookies</strong>에서 쿠키 확인
            </li>
            <li>
              • <strong>last-visited</strong> 쿠키가 자동으로 설정되는지 확인
            </li>
            <li>• 다른 페이지로 이동 후 돌아와서 쿠키 값 변경 확인</li>
            <li>• 쿠키 삭제 후 페이지 새로고침하여 재설정 확인</li>
          </ul>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 홈으로 돌아가기
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 페이지 새로고침
          </button>
        </div>
      </div>
    </div>
  );
}

