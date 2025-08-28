import { Suspense } from "react";

// SSR을 위한 데이터 페칭 함수
async function getServerSideData() {
  // 실제 API 호출을 시뮬레이션
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store", // SSR을 위해 캐시 비활성화
  });
  const data = await response.json();
  return data;
}

// SSR 컴포넌트
async function SSRComponent() {
  const data = await getServerSideData();

  return (
    <div className="p-6 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">SSR (Server-Side Rendering)</h2>
      <div className="bg-white p-4 rounded border">
        <h3 className="text-lg font-semibold mb-2">서버에서 렌더링된 데이터:</h3>
        <p className="text-gray-700">
          <strong>제목:</strong> {data.title}
        </p>
        <p className="text-gray-700">
          <strong>내용:</strong> {data.body}
        </p>
        <p className="text-sm text-gray-500 mt-2">이 페이지는 서버에서 렌더링되어 클라이언트로 전송됩니다.</p>
      </div>
    </div>
  );
}

export default function SSRPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">01. SSR 학습</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <Suspense fallback={<div className="text-center p-8">로딩 중...</div>}>
          <SSRComponent />
        </Suspense>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SSR의 특징</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>매 요청마다 서버에서 새로운 HTML을 생성</li>
            <li>실시간 데이터 반영 가능</li>
            <li>SEO 최적화에 유리</li>
            <li>초기 로딩 속도는 빠르지만 TTFB는 느림</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
