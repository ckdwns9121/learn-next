import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  return {
    title: `사용자 ${params.id} - Dynamic Router`,
    description: `사용자 ${params.id}의 프로필 페이지입니다.`,
  };
}

// 사용자 데이터 가져오기 (실제로는 API 호출)
async function getUserData(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return user;
}

export default async function UserPage({ params }: Props) {
  const user = await getUserData(params.id);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">사용자 프로필</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">{user.name}</h2>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-700">사용자 ID:</span>
              <span className="ml-2 text-gray-600">{user.id}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">이메일:</span>
              <span className="ml-2 text-gray-600">{user.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">전화번호:</span>
              <span className="ml-2 text-gray-600">{user.phone}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">웹사이트:</span>
              <span className="ml-2 text-gray-600">{user.website}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">주소 정보</h3>
            <p className="text-gray-600">
              {user.address.street}, {user.address.suite}
              <br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">회사 정보</h3>
            <p className="text-gray-600">
              <strong>{user.company.name}</strong>
              <br />
              {user.company.catchPhrase}
              <br />
              {user.company.bs}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
