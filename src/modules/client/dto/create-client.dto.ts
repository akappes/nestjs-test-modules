import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsCnpjAlreadyExist } from '../validator/cnpj-unique.validator';
import { IsCnpjValid } from '../validator/cnpj-valid.validator';

export class CreateClientDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsNotEmpty()
  @ApiProperty()
  @Validate(IsCnpjAlreadyExist)
  @Validate(IsCnpjValid)
  readonly cnpj: string
}