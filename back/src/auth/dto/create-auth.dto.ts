import { IsIn, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    name: string;
    @IsString()
    identification: string;
    @IsString()
    email: string;
    @IsString()
    @MinLength(5)
    password: string;
    @IsIn([1, 2])
    id_role: number;
}
