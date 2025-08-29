import { Suspense } from "react";
import Blog from "./components/Blog";

export default function SSRPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">01. SSR 학습</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        <Suspense fallback={<div className="text-center p-8">로딩 중...</div>}>
          <Blog />
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
