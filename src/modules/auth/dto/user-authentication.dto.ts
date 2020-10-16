import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserAuthenticationDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}