// user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { AppService } from 'src/app.service';
import { userProviders } from './user.provider';

@Module({
  providers: [UserService, ...userProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

// imports: [AppService],
