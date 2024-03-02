// user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/databases/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {}
