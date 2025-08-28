import Link from "next/link";

export default function DynamicRouterPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">04. Dynamic Router 학습</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-6 bg-orange-50 rounded-lg">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Dynamic Router 예제</h2>
          <div className="bg-white p-4 rounded border">
            <h3 className="text-lg font-semibold mb-4">동적 라우팅 예제들:</h3>

            <div className="space-y-4">
              <div className="border rounded p-3">
                <h4 className="font-semibold text-blue-600">사용자 프로필</h4>
                <p className="text-sm text-gray-600 mb-2">동적 세그먼트를 사용한 사용자별 페이지</p>
                <div className="space-x-2">
                  <Link href="/users/1" className="text-blue-500 hover:underline">
                    사용자 1
                  </Link>
                  <Link href="/users/2" className="text-blue-500 hover:underline">
                    사용자 2
                  </Link>
                  <Link href="/users/3" className="text-blue-500 hover:underline">
                    사용자 3
                  </Link>
                </div>
              </div>

              <div className="border rounded p-3">
                <h4 className="font-semibold text-green-600">블로그 포스트</h4>
                <p className="text-sm text-gray-600 mb-2">카테고리와 포스트 ID를 조합한 라우팅</p>
                <div className="space-x-2">
                  <Link href="/blog/tech/1" className="text-green-500 hover:underline">
                    기술 포스트 1
                  </Link>
                  <Link href="/blog/life/2" className="text-green-500 hover:underline">
                    일상 포스트 2
                  </Link>
                </div>
              </div>

              <div className="border rounded p-3">
                <h4 className="font-semibold text-purple-600">제품 상세</h4>
                <p className="text-sm text-gray-600 mb-2">제품 카테고리와 ID를 사용한 라우팅</p>
                <div className="space-x-2">
                  <Link href="/products/electronics/101" className="text-purple-500 hover:underline">
                    전자제품 101
                  </Link>
                  <Link href="/products/clothing/202" className="text-purple-500 hover:underline">
                    의류 202
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Dynamic Router의 특징</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>동적 세그먼트를 사용한 유연한 라우팅</li>
            <li>URL 파라미터를 통한 데이터 전달</li>
            <li>중첩된 동적 라우팅 지원</li>
            <li>SEO 친화적인 URL 구조 생성</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
