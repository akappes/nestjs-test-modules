import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { ClientController } from './client.controller';
import { IsCnpjAlreadyExist } from './validator/cnpj-unique.validator';
import { IsCnpjValid } from './validator/cnpj-valid.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [ClientService, IsCnpjAlreadyExist, IsCnpjValid],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {
}