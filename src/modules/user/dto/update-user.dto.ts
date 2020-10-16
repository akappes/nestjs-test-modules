import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsEmail, IsNotEmpty, Validate} from 'class-validator';
import { IsUserAlreadyExist } from '../validator/user.validator';

export class UpdateUserDto {

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
  @IsBoolean()
  @ApiProperty()
  readonly is_active: boolean
}
