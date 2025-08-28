// ISG를 위한 데이터 페칭 함수
async function getIncrementalData() {
  // ISR: 빌드 후에도 주기적으로 재생성
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/3", {
    next: { revalidate: 60 }, // 1분마다 재검증
  });
  const data = await response.json();
  return data;
}

// ISG 컴포넌트
async function ISGComponent() {
  const data = await getIncrementalData();

  return (
    <div className="p-6 bg-purple-50 rounded-lg">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">ISG (Incremental Static Regeneration)</h2>
      <div className="bg-white p-4 rounded border">
        <h3 className="text-lg font-semibold mb-2">점진적으로 재생성되는 데이터:</h3>
        <p className="text-gray-700">
          <strong>제목:</strong> {data.title}
        </p>
        <p className="text-gray-700">
          <strong>내용:</strong> {data.body}
        </p>
        <p className="text-sm text-gray-500 mt-2">이 페이지는 설정된 시간마다 백그라운드에서 재생성됩니다.</p>
      </div>
    </div>
  );
}

export default function ISGPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">03. ISG 학습</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <ISGComponent />

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">ISG의 특징</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>빌드 시점에 정적 페이지 생성</li>
            <li>설정된 시간마다 백그라운드에서 재생성</li>
            <li>SSG의 빠른 속도 + SSR의 최신 데이터</li>
            <li>트래픽이 많은 페이지에 적합</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
