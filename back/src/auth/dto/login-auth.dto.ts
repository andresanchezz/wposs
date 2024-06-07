import { IsString, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsString()
    email: string;
    @IsString()
    @MinLength(5)
    password: string;
}
