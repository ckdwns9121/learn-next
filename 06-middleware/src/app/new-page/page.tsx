import Link from "next/link";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">리다이렉트 성공!</h1>
          <p className="text-gray-600 text-lg">
            미들웨어에 의해 /old-page에서 이 페이지로 성공적으로 리다이렉트되었습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔄 리다이렉트 과정</h2>
            <div className="space-y-3 text-gray-600">
              <p>1. 사용자가 /old-page 접근</p>
              <p>2. 미들웨어가 경로 감지</p>
              <p>3. NextResponse.redirect() 실행</p>
              <p>4. /new-page로 자동 이동</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">💡 미들웨어 코드</h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <code className="text-sm text-gray-800">
                {`if (request.nextUrl.pathname === '/old-page') {
  return NextResponse.redirect(
    new URL('/new-page', request.url)
  )
}`}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 리다이렉트의 활용 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">🔗 URL 정규화</h3>
              <p className="text-blue-600 text-sm">www.example.com → example.com으로 통일</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🔄 버전 관리</h3>
              <p className="text-green-600 text-sm">v1 → v2로 자동 업그레이드</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🌍 지역별 리다이렉트</h3>
              <p className="text-purple-600 text-sm">IP 기반 지역별 페이지 제공</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 홈으로 돌아가기
          </Link>

          <Link
            href="/old-page"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 다시 리다이렉트 테스트
          </Link>
        </div>
      </div>
    </div>
  );
}

