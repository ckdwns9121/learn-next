"use client";

import { useState } from "react";
import UserManagement from "./components/UserManagement";
import PostManagement from "./components/PostManagement";
import AdvancedActions from "./components/AdvancedActions";

type TabType = "users" | "posts" | "advanced";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("users");

  const tabs = [
    { id: "users", name: "사용자 관리", component: UserManagement },
    { id: "posts", name: "게시물 관리", component: PostManagement },
    { id: "advanced", name: "고급 패턴", component: AdvancedActions },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Next.js Server Action 학습</h1>
              <p className="mt-2 text-gray-600">다양한 Server Action 패턴과 사용 사례를 실습해보세요</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Next.js 14</div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Server Actions
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 네비게이션 탭 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{ActiveComponent && <ActiveComponent />}</main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>Next.js Server Action 심화 학습 예제</p>
            <p className="mt-2">이 예제는 Server Action의 다양한 패턴과 사용 사례를 보여줍니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
