import { IsNumber, IsString } from "class-validator";

export class TransferDto {
    @IsNumber()
    amount: number;
    @IsString()
    account: string;
    @IsString()
    to: string;
}