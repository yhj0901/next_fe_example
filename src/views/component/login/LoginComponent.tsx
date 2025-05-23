"use client";

import { useEffect } from "react";
import { LoginMain } from "./view/LoginMain";
import LoginViewModel from "./viewModel/LoginViewModel";

/*********************************************************************************
 * Login Page Component (loginView + viewModel)
 *********************************************************************************/
const LoginComponent = () => {
  const {
    loginState,
    formData,
    errors,
    isLoading,
    handleIdChange,
    handlePasswordChange,
    handleLoginSubmit,
    handleLogout,
    clearErrors,
  } = LoginViewModel();

  useEffect(() => {
    // 컴포넌트 마운트 시 초기화
    clearErrors();
  }, [clearErrors]);

  return (
    <LoginMain
      loginState={loginState}
      id={formData.id}
      password={formData.password}
      errors={errors}
      isLoading={isLoading}
      onIdChange={handleIdChange}
      onPasswordChange={handlePasswordChange}
      onLoginSubmit={handleLoginSubmit}
      onLogout={handleLogout}
    />
  );
};

export default LoginComponent;
