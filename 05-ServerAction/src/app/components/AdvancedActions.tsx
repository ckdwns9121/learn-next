'use client';

import { useState } from 'react';
import { 
  conditionalAction, 
  batchProcess, 
  progressiveProcess, 
  uploadFile, 
  searchAndFilter,
  smartRevalidation
} from '@/lib/advanced-actions';
import { ServerActionResult } from '@/types';

export default function AdvancedActions() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [results, setResults] = useState<any>(null);

  // 조건부 액션 실행
  const handleConditionalAction = async () => {
    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const result = await conditionalAction('user_1', 'delete_user', {});
      
      if (result.success) {
        setMessage({ type: 'success', text: '조건부 액션이 성공적으로 실행되었습니다.' });
        setResults(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || '조건부 액션 실행 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '조건부 액션 실행 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 배치 처리 실행
  const handleBatchProcess = async () => {
    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const items = ['item_1', 'item_2', 'item_3', 'item_4', 'item_5'];
      const result = await batchProcess(items, 'publish');
      
      if (result.success) {
        setMessage({ type: 'success', text: '배치 처리가 완료되었습니다.' });
        setResults(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || '배치 처리 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '배치 처리 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 점진적 처리 실행
  const handleProgressiveProcess = async () => {
    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const items = ['task_1', 'task_2', 'task_3', 'task_4', 'task_5'];
      const result = await progressiveProcess(items);
      
      if (result.success) {
        setMessage({ type: 'success', text: '점진적 처리가 완료되었습니다.' });
        setResults(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || '점진적 처리 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '점진적 처리 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 파일 업로드 시뮬레이션
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const result = await uploadFile(formData);
      
      if (result.success) {
        setMessage({ type: 'success', text: '파일이 성공적으로 업로드되었습니다.' });
        setResults(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || '파일 업로드 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '파일 업로드 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 검색 및 필터링 실행
  const handleSearchAndFilter = async () => {
    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const result = await searchAndFilter(
        '검색',
        { category: 'tech', status: 'published' },
        1,
        5
      );
      
      if (result.success) {
        setMessage({ type: 'success', text: '검색 및 필터링이 완료되었습니다.' });
        setResults(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || '검색 및 필터링 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '검색 및 필터링 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 스마트 캐시 무효화 실행
  const handleSmartRevalidation = async () => {
    setLoading(true);
    setMessage(null);
    setResults(null);

    try {
      const result = await smartRevalidation('create', 'post');
      
      if (result.success) {
        setMessage({ type: 'success', text: '캐시 무효화가 완료되었습니다.' });
        setResults({ message: '게시물 생성에 대한 캐시가 무효화되었습니다.' });
      } else {
        setMessage({ type: 'error', text: result.error || '캐시 무효화 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '캐시 무효화 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">고급 Server Action 패턴</h2>
      
      {/* 메시지 표시 */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* 결과 표시 */}
      {results && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">실행 결과:</h4>
          <pre className="text-sm text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {/* 고급 액션 버튼들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 조건부 액션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">조건부 액션</h3>
          <p className="text-sm text-gray-600 mb-4">
            사용자 역할에 따라 다른 동작을 수행하는 Server Action
          </p>
          <button
            onClick={handleConditionalAction}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '실행 중...' : '조건부 액션 실행'}
          </button>
        </div>

        {/* 배치 처리 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">배치 처리</h3>
          <p className="text-sm text-gray-600 mb-4">
            여러 항목을 한 번에 처리하는 Server Action
          </p>
          <button
            onClick={handleBatchProcess}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '배치 처리 실행'}
          </button>
        </div>

        {/* 점진적 처리 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">점진적 처리</h3>
          <p className="text-sm text-gray-600 mb-4">
            진행률을 추적하는 Server Action (Streaming)
          </p>
          <button
            onClick={handleProgressiveProcess}
            disabled={loading}
            className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '점진적 처리 실행'}
          </button>
        </div>

        {/* 파일 업로드 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">파일 업로드</h3>
          <p className="text-sm text-gray-600 mb-4">
            파일 유효성 검사 및 업로드 처리
          </p>
          <input
            type="file"
            onChange={handleFileUpload}
            accept="image/*,.pdf"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* 검색 및 필터링 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">검색 및 필터링</h3>
          <p className="text-sm text-gray-600 mb-4">
            복잡한 검색 조건과 페이지네이션
          </p>
          <button
            onClick={handleSearchAndFilter}
            disabled={loading}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '검색 중...' : '검색 및 필터링 실행'}
          </button>
        </div>

        {/* 스마트 캐시 무효화 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">스마트 캐시 무효화</h3>
          <p className="text-sm text-gray-600 mb-4">
            상황에 따른 최적화된 캐시 무효화 전략
          </p>
          <button
            onClick={handleSmartRevalidation}
            disabled={loading}
            className="w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '캐시 무효화 실행'}
          </button>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Server Action 패턴 설명</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <strong>조건부 액션:</strong> 사용자 권한이나 다른 조건에 따라 다른 동작을 수행
          </div>
          <div>
            <strong>배치 처리:</strong> 여러 항목을 효율적으로 처리하고 오류 처리
          </div>
          <div>
            <strong>점진적 처리:</strong> 긴 작업의 진행률을 추적하고 사용자에게 피드백 제공
          </div>
          <div>
            <strong>파일 업로드:</strong> 파일 유효성 검사, 크기 제한, 타입 검증
          </div>
          <div>
            <strong>검색 및 필터링:</strong> 복잡한 쿼리와 페이지네이션 처리
          </div>
          <div>
            <strong>스마트 캐시 무효화:</strong> 상황에 맞는 최적화된 캐시 관리
          </div>
        </div>
      </div>
    </div>
  );
}
