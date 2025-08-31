import Link from "next/link";

export default function ProtectedDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-center text-green-800 mb-4">🎉 보호된 대시보드에 접근 성공!</h1>
          <p className="text-center text-gray-600 text-lg">미들웨어의 인증 검사를 통과했습니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔐 인증 상태</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700">인증 토큰 유효</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700">접근 권한 확인됨</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700">미들웨어 검증 통과</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 대시보드 정보</h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>사용자:</strong> 테스트 사용자
              </p>
              <p>
                <strong>접근 시간:</strong> {new Date().toLocaleString("ko-KR")}
              </p>
              <p>
                <strong>세션 상태:</strong> 활성
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔍 미들웨어 동작 과정</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">요청 감지</h3>
                <p className="text-gray-600">사용자가 /protected/dashboard에 접근 시도</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">미들웨어 실행</h3>
                <p className="text-gray-600">middleware.ts 파일의 함수가 실행됨</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">쿠키 검증</h3>
                <p className="text-gray-600">auth-token 쿠키의 존재와 유효성 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">접근 허용</h3>
                <p className="text-gray-600">토큰이 유효하므로 페이지 접근 허용</p>
              </div>
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
            href="/login"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔑 로그인 페이지
          </Link>
        </div>
      </div>
    </div>
  );
}
