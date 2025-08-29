async function getBlogData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

async function Blog() {
  const data = await getBlogData();

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

export default Blog;
