import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, Validate} from 'class-validator';
import { IsCnpjAlreadyExist } from '../validator/cnpj-unique.validator';
import { IsCnpjValid } from '../validator/cnpj-valid.validator';

export class UpdateClientDto {

  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsNotEmpty()
  @ApiProperty()
  @Validate(IsCnpjAlreadyExist)
  @Validate(IsCnpjValid)
  readonly cnpj: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly is_active: boolean
}
