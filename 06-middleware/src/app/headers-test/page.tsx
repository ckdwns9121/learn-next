"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeadersTestPage() {
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 페이지의 응답 헤더를 가져오기 위해 fetch 사용
    const fetchHeaders = async () => {
      try {
        const response = await fetch("/headers-test");
        const responseHeaders: Record<string, string> = {};

        // 응답 헤더를 객체로 변환
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        setHeaders(responseHeaders);
      } catch (error) {
        console.error("헤더를 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaders();
  }, []);

  // 미들웨어에서 추가되는 주요 헤더들
  const middlewareHeaders = ["X-Frame-Options", "X-Content-Type-Options", "Referrer-Policy", "X-Middleware-Cache"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">📋 HTTP 헤더 테스트</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔍 미들웨어에서 추가되는 헤더들</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">🛡️ 보안 헤더</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <strong>X-Frame-Options:</strong> DENY
                  <p className="text-blue-600 text-xs mt-1">클릭재킹 공격 방지</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <strong>X-Content-Type-Options:</strong> nosniff
                  <p className="text-blue-600 text-xs mt-1">MIME 타입 스니핑 방지</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <strong>Referrer-Policy:</strong> strict-origin-when-cross-origin
                  <p className="text-blue-600 text-xs mt-1">리퍼러 정보 전송 정책</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">🔧 커스텀 헤더</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <strong>X-Middleware-Cache:</strong> no-cache
                  <p className="text-green-600 text-xs mt-1">미들웨어 캐시 설정</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 실제 응답 헤더</h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">헤더 정보를 가져오는 중...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">전체 응답 헤더:</h3>
                <div className="space-y-2">
                  {Object.entries(headers).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-white p-2 rounded">
                      <span className="font-mono text-sm text-gray-800">{key}:</span>
                      <span className="font-mono text-sm text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 확인 방법:</h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• 개발자 도구 → Network 탭 → headers-test 요청 클릭</li>
                  <li>• Response Headers 섹션에서 미들웨어 헤더 확인</li>
                  <li>• X-Frame-Options, X-Content-Type-Options 등 확인</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 미들웨어 헤더 설정 코드</h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800">
              {`// middleware.ts에서 헤더 설정
const response = NextResponse.next()

// 보안 헤더 추가
response.headers.set('X-Frame-Options', 'DENY')
response.headers.set('X-Content-Type-Options', 'nosniff')
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

// 커스텀 헤더 추가
response.headers.set('X-Middleware-Cache', 'no-cache')

return response`}
            </pre>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 홈으로 돌아가기
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 헤더 새로고침
          </button>
        </div>
      </div>
    </div>
  );
}
