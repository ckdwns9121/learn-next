import Link from "next/link";

type Props = {
  params: {
    category: string;
    id: string;
  };
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.category} 포스트 ${params.id} - Dynamic Router`,
    description: `${params.category} 카테고리의 ${params.id}번 포스트입니다.`,
  };
}

// 블로그 포스트 데이터 가져오기
async function getBlogPost(category: string, id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await response.json();

  // 카테고리 정보 추가
  return {
    ...post,
    category: category,
    author: "작성자",
    date: new Date().toLocaleDateString("ko-KR"),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.category, params.id);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            ← 메인으로 돌아가기
          </Link>
        </div>

        <article className="bg-white p-8 rounded-lg shadow-md">
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{params.category}</span>
              <span className="text-gray-500 text-sm">{post.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
            <p className="text-gray-600">작성자: {post.author}</p>
          </header>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">{post.body}</p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              이 글은 {params.category} 카테고리에 속한 {params.id}번 포스트입니다. 동적 라우팅을 통해 카테고리와 포스트
              ID를 URL에서 가져와서 적절한 콘텐츠를 표시합니다.
            </p>
          </div>

          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                포스트 ID: {post.id} | 카테고리: {params.category}
              </div>
              <div className="space-x-2">
                <Link
                  href={`/blog/${params.category}/${Number(params.id) - 1}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  이전 포스트
                </Link>
                <Link
                  href={`/blog/${params.category}/${Number(params.id) + 1}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  다음 포스트
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
