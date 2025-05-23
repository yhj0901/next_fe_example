import React from "react";
import { LoginState, LoginErrors } from "../viewModel/LoginViewModel";

interface LoginMainProps {
  loginState: LoginState;
  id: string;
  password: string;
  errors: LoginErrors;
  isLoading: boolean;
  onIdChange: (id: string) => void;
  onPasswordChange: (password: string) => void;
  onLoginSubmit: () => void;
}

/*********************************************************************************
 * Login Main View Component
 *********************************************************************************/
export const LoginMain: React.FC<LoginMainProps> = ({
  loginState,
  id,
  password,
  errors,
  isLoading,
  onIdChange,
  onPasswordChange,
  onLoginSubmit,
}) => {
  // 로그인 성공 시 표시할 화면
  if (loginState.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              로그인 성공!
            </h2>
            <p className="text-gray-600 mb-4">환영합니다!</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">사용자 정보:</p>
              <pre className="text-xs mt-2 overflow-auto">
                {JSON.stringify(loginState.user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 로그인 폼 화면
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSubmit();
          }}
          className="space-y-6"
        >
          {/* 전체 에러 메시지 */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* 이메일 입력 */}
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              아이디
            </label>
            <input
              id="id"
              type="id"
              value={id}
              onChange={(e) => onIdChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.id ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="아이디를 입력하세요"
              disabled={isLoading}
            />
            {errors.id && (
              <p className="mt-1 text-sm text-red-600">{errors.id}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 개발용 테스트 정보 */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">테스트용 계정 정보:</p>
          <p className="text-xs text-gray-600">아이디: test@test.com</p>
          <p className="text-xs text-gray-600">비밀번호: 123456</p>
        </div>
      </div>
    </div>
  );
};
