import { UserDto } from "./UserDto";

export interface SignInResultDto {
  accessToken: string;
  user: UserDto;
}
