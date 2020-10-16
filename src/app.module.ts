import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ElasticsearchModule} from "@nestjs/elasticsearch";
import * as ormconfig from './ormconfig';
import { ClientModule } from './modules/client/client.module';
import { CommandModule } from 'nestjs-command';
import {CreateIndexCommand} from "./modules/bidding/command/create-index.command";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
    CommandModule,
    AuthModule, UserModule, ClientModule
  ],
  providers: [
    CreateIndexCommand
  ]
})
export class AppModule {
}
