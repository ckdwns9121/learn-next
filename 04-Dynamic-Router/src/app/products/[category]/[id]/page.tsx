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
    title: `${params.category} 제품 ${params.id} - Dynamic Router`,
    description: `${params.category} 카테고리의 ${params.id}번 제품 상세 정보입니다.`,
  };
}

// 제품 데이터 가져오기
async function getProduct(category: string, id: string) {
  // 실제로는 제품 API를 호출
  const mockProduct = {
    id: id,
    name: `${category} 제품 ${id}`,
    category: category,
    price: Math.floor(Math.random() * 100000) + 10000,
    description: `이 제품은 ${category} 카테고리에 속한 ${id}번 제품입니다. 동적 라우팅을 통해 카테고리와 제품 ID를 URL에서 가져와서 적절한 제품 정보를 표시합니다.`,
    features: ["고품질 소재 사용", "내구성 우수", "사용자 친화적 디자인", "합리적인 가격"],
    stock: Math.floor(Math.random() * 100) + 1,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 ~ 5.0
    images: [
      "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=제품이미지1",
      "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=제품이미지2",
      "https://via.placeholder.com/400x300/EC4899/FFFFFF?text=제품이미지3",
    ],
  };

  return mockProduct;
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.category, params.id);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            ← 메인으로 돌아가기
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 제품 이미지 */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img src={image} alt={`${product.name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* 제품 정보 */}
          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{params.category}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">₩{product.price.toLocaleString()}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600">{product.rating}</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">주요 특징</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">재고: {product.stock}개</span>
              <span className="text-gray-600">제품 ID: {product.id}</span>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                장바구니에 추가
              </button>
              <button className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                찜하기
              </button>
            </div>
          </div>
        </div>

        {/* 관련 제품 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 제품</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((relatedId) => (
              <Link
                key={relatedId}
                href={`/products/${params.category}/${relatedId}`}
                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 rounded mb-3"></div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {params.category} 제품 {relatedId}
                </h3>
                <p className="text-gray-600 text-sm">
                  ₩{(Math.floor(Math.random() * 100000) + 10000).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
