'use client';

import { useState, useEffect } from 'react';
import { createPost, deletePost, togglePostStatus, getPosts } from '@/lib/actions';
import { Post, ServerActionResult } from '@/types';

export default function PostManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false
  });

  // 게시물 목록 로드
  const loadPosts = async () => {
    setLoading(true);
    try {
      const postList = await getPosts();
      setPosts(postList);
    } catch (error) {
      setMessage({ type: 'error', text: '게시물 목록을 불러오는 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('content', formData.content);
      formDataObj.append('published', formData.published.toString());

      const result: ServerActionResult<Post> = await createPost(formDataObj);

      if (result.success && result.data) {
        setMessage({ type: 'success', text: '게시물이 성공적으로 생성되었습니다.' });
        setFormData({ title: '', content: '', published: false });
        loadPosts(); // 목록 새로고침
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || '게시물 생성 중 오류가 발생했습니다.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '게시물 생성 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (postId: string) => {
    if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await deletePost(postId);
      
      if (result.success) {
        setMessage({ type: 'success', text: '게시물이 성공적으로 삭제되었습니다.' });
        loadPosts(); // 목록 새로고침
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || '게시물 삭제 중 오류가 발생했습니다.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '게시물 삭제 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  // 게시물 상태 토글
  const handleToggleStatus = async (postId: string) => {
    setLoading(true);
    try {
      const result = await togglePostStatus(postId);
      
      if (result.success) {
        setMessage({ type: 'success', text: '게시물 상태가 변경되었습니다.' });
        loadPosts(); // 목록 새로고침
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || '게시물 상태 변경 중 오류가 발생했습니다.' 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: '게시물 상태 변경 중 오류가 발생했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">게시물 관리</h2>
      
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

      {/* 게시물 생성 폼 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">새 게시물 생성</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="게시물 제목"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="게시물 내용을 입력하세요..."
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              즉시 발행
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '생성 중...' : '게시물 생성'}
          </button>
        </form>
      </div>

      {/* 게시물 목록 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">게시물 목록</h3>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">로딩 중...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 게시물이 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.published ? '발행됨' : '임시저장'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>생성일: {new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(post.id)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        post.published
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {post.published ? '임시저장으로 변경' : '발행하기'}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
