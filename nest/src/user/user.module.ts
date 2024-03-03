// user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';
import { userProviders } from './user.provider';

@Module({
  imports: [AppService],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
