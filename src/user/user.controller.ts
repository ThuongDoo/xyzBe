import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/shared/guard/authenticated.guard';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { UserRole } from './user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthenticatedGuard)
  // @Get()
  // @Roles(UserRole.ADMIN, UserRole.STOCK1)
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get('/userRequest')
  getUserRequest() {
    return this.userService.getUserRequest();
  }

  @Get()
  getUser() {
    return this.userService.getAllUser();
  }
}
