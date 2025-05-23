import { useState, useCallback } from "react";
import { LoginDomain } from "@/core/domain/login/LoginDomain";
import { LoginResponseType } from "@/core/repository/api/LoginAip";

const TAG = "LoginViewModel";

// 로그인 상태 타입
export interface LoginState {
  isLoggedIn: boolean;
  user: LoginResponseType | null;
}

// 폼 데이터 타입
export interface FormData {
  id: string;
  password: string;
}

// 에러 타입
export interface LoginErrors {
  id?: string;
  password?: string;
  general?: string;
}

/*********************************************************************************
 * Login ViewModel
 *********************************************************************************/
const LoginViewModel = () => {
  // Domain
  const [loginDomain] = useState<LoginDomain>(new LoginDomain());

  // States
  const [loginState, setLoginState] = useState<LoginState>({
    isLoggedIn: false,
    user: null,
  });

  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 이메일 입력 처리
   */
  const handleIdChange = useCallback(
    (id: string) => {
      setFormData((prev) => ({ ...prev, id }));
      // 입력 시 해당 필드 에러 클리어
      if (errors.id) {
        setErrors((prev) => ({ ...prev, id: undefined }));
      }
    },
    [errors.id]
  );

  /**
   * 비밀번호 입력 처리
   */
  const handlePasswordChange = useCallback(
    (password: string) => {
      setFormData((prev) => ({ ...prev, password }));
      // 입력 시 해당 필드 에러 클리어
      if (errors.password) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    },
    [errors.password]
  );

  /**
   * 로그인 제출 처리
   */
  const handleLoginSubmit = useCallback(async () => {
    try {
      // 기본 유효성 검사
      const newErrors: LoginErrors = {};

      if (!formData.id.trim()) {
        newErrors.id = "아이디를 입력해주세요";
      }
      if (!formData.password.trim()) {
        newErrors.password = "비밀번호를 입력해주세요";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      setErrors({}); // 기존 에러 클리어

      const result = await loginDomain.Login({
        id: formData.id,
        password: formData.password,
      });

      if (result.success) {
        setLoginState({
          isLoggedIn: true,
          user: result.user,
        });
        console.log(TAG, "로그인 성공:", result.user);
      }
    } catch (error: unknown) {
      console.error(TAG, "로그인 실패:", error);

      if (error instanceof Error) {
        setErrors({
          general:
            error.message === "wrong"
              ? "잘못된 아이디 또는 비밀번호입니다"
              : "로그인에 실패했습니다. 다시 시도해주세요.",
        });
      } else {
        setErrors({
          general: "알 수 없는 오류가 발생했습니다.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, loginDomain]);

  /**
   * 로그아웃 처리
   */
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);

      const success = await loginDomain.logout();

      if (success) {
        setLoginState({
          isLoggedIn: false,
          user: null,
        });

        setFormData({ id: "", password: "" });
        console.log(TAG, "로그아웃 성공");
      }
    } catch (error: unknown) {
      console.error(TAG, "로그아웃 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [loginDomain]);

  /**
   * 에러 메시지 클리어
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    // States
    loginState,
    formData,
    errors,
    isLoading,

    // Actions
    handleIdChange,
    handlePasswordChange,
    handleLoginSubmit,
    handleLogout,
    clearErrors,
  };
};

export default LoginViewModel;
