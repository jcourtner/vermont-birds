import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //find a user PUT request, if the user exists, update their record
  // if user doesn't exist, create a new record...upsert
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log('user not found');
    }
    return user;
  }
  // @Get('user')
  // getUser(): string {
  //   return this.userService.getUser();
  // }

  // @Post()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
