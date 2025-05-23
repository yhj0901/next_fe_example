import dynamic from "next/dynamic";

// 로그인 컴포넌트 지연 로딩
const LoginComponent = dynamic(
  () => import("@/views/component/login/LoginComponent"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">로그인 페이지를 불러오는 중...</p>
          </div>
        </div>
      </div>
    ),
    ssr: true, // 서버 사이드 렌더링 활성화 (SEO를 위해)
  }
);

/*********************************************************************************
 * Login Page
 *********************************************************************************/
export default function LoginPage() {
  return <LoginComponent />;
}
