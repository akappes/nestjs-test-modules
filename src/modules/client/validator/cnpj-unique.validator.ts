import {ValidatorConstraint} from 'class-validator';
import {Injectable, Inject} from '@nestjs/common';

import { ClientService } from '../client.service';

@ValidatorConstraint({ name: 'IsCnpjAlreadyExist', async: true })
@Injectable()
export class IsCnpjAlreadyExist {
  constructor(
    @Inject('ClientService') private readonly clientService: ClientService,
  ) {}

  validate(cnpj: string): Promise<boolean> {
    return this.clientService.findOne({cnpj}).then(client => !client);
  }

  defaultMessage(): string {
    return 'Client with this cnpj already exists.';
  }
}