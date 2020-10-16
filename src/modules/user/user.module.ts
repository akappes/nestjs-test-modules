import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { IsUserAlreadyExist } from './validator/user.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, IsUserAlreadyExist],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
}