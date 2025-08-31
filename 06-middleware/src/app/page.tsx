import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">🔧 Next.js 미들웨어 실습</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">미들웨어 기능 설명</h2>
          <div className="space-y-3 text-gray-600">
            <p>
              ✅ <strong>요청 로깅:</strong> 모든 요청의 정보를 콘솔에 출력
            </p>
            <p>
              ✅ <strong>리다이렉트:</strong> 특정 경로를 다른 경로로 리다이렉트
            </p>
            <p>
              ✅ <strong>인증 보호:</strong> 보호된 경로에 대한 접근 제어
            </p>
            <p>
              ✅ <strong>봇 차단:</strong> 특정 사용자 에이전트 차단
            </p>
            <p>
              ✅ <strong>보안 헤더:</strong> 보안 관련 HTTP 헤더 추가
            </p>
            <p>
              ✅ <strong>쿠키 관리:</strong> 방문 시간 기록 등
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 테스트 페이지들 */}
          <Link
            href="/old-page"
            className="bg-red-100 hover:bg-red-200 p-6 rounded-lg border-2 border-red-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-red-800 mb-2">🔄 리다이렉트 테스트</h3>
            <p className="text-red-600">/old-page → /new-page로 리다이렉트됩니다</p>
          </Link>

          <Link
            href="/protected/dashboard"
            className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg border-2 border-yellow-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔒 인증 보호 테스트</h3>
            <p className="text-yellow-600">인증 없이 접근하면 로그인 페이지로 이동</p>
          </Link>

          <Link
            href="/new-page"
            className="bg-green-100 hover:bg-green-200 p-6 rounded-lg border-2 border-green-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">✨ 새 페이지</h3>
            <p className="text-green-600">리다이렉트된 페이지입니다</p>
          </Link>

          <Link
            href="/login"
            className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg border-2 border-blue-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🔑 로그인 페이지</h3>
            <p className="text-blue-600">인증 토큰을 설정할 수 있습니다</p>
          </Link>

          <Link
            href="/headers-test"
            className="bg-purple-100 hover:bg-purple-200 p-6 rounded-lg border-2 border-purple-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-2">📋 헤더 테스트</h3>
            <p className="text-purple-600">미들웨어에서 추가된 헤더 확인</p>
          </Link>

          <Link
            href="/cookie-test"
            className="bg-orange-100 hover:bg-orange-200 p-6 rounded-lg border-2 border-orange-300 transition-colors"
          >
            <h3 className="text-lg font-semibold text-orange-800 mb-2">🍪 쿠키 테스트</h3>
            <p className="text-orange-600">설정된 쿠키 정보 확인</p>
          </Link>
        </div>

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">📝 개발자 도구에서 확인할 것들:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>콘솔에서 미들웨어 로그 확인</li>
            <li>Network 탭에서 응답 헤더 확인</li>
            <li>Application 탭에서 쿠키 확인</li>
            <li>리다이렉트 동작 확인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
