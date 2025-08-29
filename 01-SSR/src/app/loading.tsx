/**
 * loading.tsx는 데이터를 불러오는 중에 표시되는 페이지입니다.
 * 개발자가 직접 import 할 필요없이 파일만 생성하면 자동으로 표시됩니다.
 * 만약 직접 import해서 사용할꺼면 <Suspense fallback={}> 객체안에 넣어주면 됩니다.
 */

import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
      <p className="mt-4 text-gray-600">데이터를 불러오는 중입니다...!!!!!!!!!</p>
    </div>
  );
}
