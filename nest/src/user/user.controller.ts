import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log('user not found');
    }
    return user;
  }
}
