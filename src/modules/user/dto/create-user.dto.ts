import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsUserAlreadyExist } from '../validator/user.validator';

export class CreateUserDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUserAlreadyExist)
  @ApiProperty()
  readonly  email: string

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string

  @IsNotEmpty()
  @ApiProperty()
  readonly client_id: string
}