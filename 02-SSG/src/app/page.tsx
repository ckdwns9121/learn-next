// SSG를 위한 데이터 페칭 함수
async function getStaticData() {
  // 빌드 시점에 데이터를 가져옴
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
    next: { revalidate: 3600 }, // 1시간마다 재검증
  });
  const data = await response.json();
  return data;
}

// SSG 컴포넌트
async function SSGComponent() {
  const data = await getStaticData();

  return (
    <div className="p-6 bg-green-50 rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4">SSG (Static Site Generation)</h2>
      <div className="bg-white p-4 rounded border">
        <h3 className="text-lg font-semibold mb-2">빌드 시점에 생성된 데이터:</h3>
        <p className="text-gray-700">
          <strong>제목:</strong> {data.title}
        </p>
        <p className="text-gray-700">
          <strong>내용:</strong> {data.body}
        </p>
        <p className="text-sm text-gray-500 mt-2">이 페이지는 빌드 시점에 생성되어 CDN에 배포됩니다.</p>
      </div>
    </div>
  );
}

export default function SSGPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">02. SSG 학습</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <SSGComponent />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">SSG의 특징</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>빌드 시점에 모든 페이지를 미리 생성</li>
            <li>매우 빠른 로딩 속도</li>
            <li>CDN 배포로 전 세계 어디서나 빠른 접근</li>
            <li>데이터가 자주 변경되지 않는 콘텐츠에 적합</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
