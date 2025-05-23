/*********************************************************************************
 * Login UseCase
 *********************************************************************************/

import {
  LoginApi,
  LoginApiInterface,
  LoginRequestType,
  LoginResponseType,
} from "../../repository/api/LoginAip";

/**
 * Login Result Code
 */
export const enum LoginErrorCode {
  WRONG_ID_PW = "wrong",
  USER_ID_NOT_EXIST = "userId",
  ROBOT_USER = "robot",
  BLOCK_USER = "suspicion",
  UNKOWN_ERROR = "unkownError",
  EMAIL_LOGIN_IS_EMPTY = "email Login is Empty",
}

const TAG = "LoginUseCase";

/*********************************************************************************
 * Login UseCase
 *********************************************************************************/
export class LoginUseCase {
  // Repository
  public loginApi: LoginApiInterface;

  constructor() {
    this.loginApi = new LoginApi();
  }

  /**
   * email login api call
   * @param req
   * @returns
   */
  public login = async (req: LoginRequestType): Promise<LoginResponseType> => {
    try {
      const res = await this.loginApi.login(req);

      if (!res.token || res.token === "") {
        throw new Error(LoginErrorCode.EMAIL_LOGIN_IS_EMPTY);
      }

      return res;
    } catch (e: unknown) {
      console.warn(TAG, e);

      if (e && typeof e === "object" && "response" in e) {
        const errorResponse = e as {
          response?: { data?: { action?: string } };
        };
        if (errorResponse.response?.data?.action) {
          throw new Error(errorResponse.response.data.action);
        }
      }

      if (
        e instanceof Error &&
        e.message === LoginErrorCode.EMAIL_LOGIN_IS_EMPTY
      ) {
        throw new Error(LoginErrorCode.EMAIL_LOGIN_IS_EMPTY);
      }

      // 위에 있는 모든 경우에 안속하면
      throw new Error(LoginErrorCode.UNKOWN_ERROR);
    }
  };

  /**
   * logout api 요청
   */
  public logout = async (): Promise<void> => {
    try {
      await this.loginApi.logout();
    } catch (e: unknown) {
      console.warn(TAG, e);
      throw new Error("Logout failed");
    }
  };
}
