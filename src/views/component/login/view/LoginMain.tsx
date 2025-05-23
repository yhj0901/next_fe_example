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
  onLogout?: () => void;
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
  onLogout,
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

            {/* 사용자 정보 표시 */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-500 mb-2">사용자 정보:</p>
              <div className="text-left">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">토큰:</span>{" "}
                  {loginState.user?.token}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">이름:</span>{" "}
                  {loginState.user?.name}
                </p>
              </div>
            </div>

            {/* 로그아웃 버튼 */}
            {onLogout && (
              <button
                onClick={onLogout}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isLoading ? "로그아웃 중..." : "로그아웃"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 로그인 폼 화면
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        {/* 로그인 폼 */}
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
              <div className="flex items-center">
                <div className="text-red-500 text-sm mr-2">⚠️</div>
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            </div>
          )}

          {/* 아이디 입력 */}
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              아이디
            </label>
            <input
              id="id"
              type="text"
              value={id}
              onChange={(e) => onIdChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.id ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="아이디를 입력하세요"
              disabled={isLoading}
            />
            {errors.id && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.id}
              </p>
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
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                로그인 중...
              </div>
            ) : (
              "로그인"
            )}
          </button>
        </form>

        {/* 구분선 */}
        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">개발용 정보</span>
          </div>
        </div>

        {/* 개발용 테스트 정보 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="text-blue-500 text-sm mr-2">ℹ️</div>
            <p className="text-xs font-medium text-blue-700">
              테스트용 계정 정보
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-blue-600">
              <span className="font-medium">아이디:</span> test@test.com
            </p>
            <p className="text-xs text-blue-600">
              <span className="font-medium">비밀번호:</span> 123456
            </p>
          </div>
        </div>

        {/* 추가 링크들 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            계정이 없으신가요?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              회원가입
            </a>
          </p>
          <p className="text-xs text-gray-500">
            <a href="#" className="text-gray-600 hover:text-gray-700">
              비밀번호를 잊으셨나요?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
