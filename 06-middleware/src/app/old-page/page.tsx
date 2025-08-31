export default function OldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🔄</div>
        <h1 className="text-3xl font-bold text-red-800 mb-4">이 페이지는 곧 리다이렉트됩니다</h1>
        <p className="text-gray-600 mb-6">
          미들웨어에 의해 자동으로 /new-page로 리다이렉트됩니다. 잠시만 기다려주세요...
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">🔍 미들웨어 동작:</h3>
          <p className="text-red-600 text-sm">
            middleware.ts에서 /old-page 경로를 감지하고 NextResponse.redirect()를 사용하여 리다이렉트를 수행합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

