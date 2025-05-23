/*********************************************************************************
 인증에 관한 요청을 전송하는 api repository
*********************************************************************************/

import axios from "axios";

// 로그인 요청 타입
export interface LoginRequestType {
  id: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponseType {
  token: string;
  name: string;
}

export interface LoginApiInterface {
  login(request: LoginRequestType): Promise<LoginResponseType>;
  logout(): Promise<void>;
}

export class LoginApi implements LoginApiInterface {
  // URL
  private readonly LoginUrl = "/api/login";
  private readonly LogoutUrl = "/api/logout";

  // 로그인
  login(request: LoginRequestType): Promise<LoginResponseType> {
    return axios.post(this.LoginUrl, request);
  }

  logout(): Promise<void> {
    return axios.post(this.LogoutUrl);
  }
}
