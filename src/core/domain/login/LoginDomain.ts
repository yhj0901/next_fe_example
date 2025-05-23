import { LoginUseCase, LoginErrorCode } from "../../useCase/login/LoginUseCase";
import { LoginResponseType } from "../../repository/api/LoginAip";

const TAG = "LoginDomain";

/*********************************************************************************
 * login에 대한 Domain
 * 로그인에 대한 비즈니스 로직 처리
 *********************************************************************************/
export class LoginDomain {
  protected readonly loginUseCase: LoginUseCase;

  constructor() {
    this.loginUseCase = new LoginUseCase();
  }

  /**
   * 로그인 처리 process
   * @param params
   * @returns
   */
  Login = async (params: {
    id: string;
    password: string;
  }): Promise<{
    user: LoginResponseType;
    success: boolean;
  }> => {
    const { id, password } = params;

    try {
      const user = await this.loginUseCase.login({
        id,
        password,
      });

      console.log(TAG, "로그인 성공:", user);

      return {
        user,
        success: true,
      };
    } catch (error: unknown) {
      console.error(TAG, "로그인 실패:", error);

      if (error instanceof Error) {
        // 특정 오류에 대한 추가 처리
        switch (error.message) {
          case LoginErrorCode.EMAIL_LOGIN_IS_EMPTY:
            console.warn(TAG, "토큰이 비어있습니다");
            break;
          case LoginErrorCode.WRONG_ID_PW:
            console.warn(TAG, "잘못된 아이디 또는 비밀번호입니다");
            break;
          case LoginErrorCode.USER_ID_NOT_EXIST:
            console.warn(TAG, "존재하지 않는 사용자입니다");
            break;
          default:
            console.warn(TAG, "알 수 없는 오류가 발생했습니다");
        }
      }

      throw error;
    }
  };

  /**
   * 로그아웃 처리 process
   * @returns
   */
  logout = async (): Promise<boolean> => {
    try {
      await this.loginUseCase.logout();

      console.log(TAG, "로그아웃 성공");

      return true;
    } catch (error: unknown) {
      console.error(TAG, "로그아웃 실패:", error);

      return false;
    }
  };
}
