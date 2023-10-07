import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    data: string


}
