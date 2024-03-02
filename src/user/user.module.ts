// user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService],
})
export class UserModule {}
