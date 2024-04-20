import { SignInResultDto } from "../interfaces/SignInResultDto";
import { SignInDto } from "../interfaces/SignInDto";
import ServiceBase from "./ServiceBase";

class AuthService extends ServiceBase {
  async signIn(data: SignInDto): Promise<SignInResultDto> {
    const response = await this.post<SignInDto, SignInResultDto>(
      "/Sessions/signin",
      data
    );
    return response;
  }
}

const authService = new AuthService("http://localhost:5001/api");

export default authService;
