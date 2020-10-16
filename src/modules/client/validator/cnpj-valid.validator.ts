import {ValidatorConstraint} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';
import { cnpj as CnpjValidator } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'IsCnpjValid', async: true })
@Injectable()
export class IsCnpjValid {
  constructor() {}

  validate(cnpj: string): boolean {
    return CnpjValidator.isValid(cnpj);
  }

  defaultMessage(): string {
    return 'This cnpj is invalid.';
  }
}