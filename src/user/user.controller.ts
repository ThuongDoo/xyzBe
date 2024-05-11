import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/shared/guard/authenticated.guard';
import { Roles } from 'src/shared/decorator/roles.decorator';
import { UserRole } from './user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Roles(UserRole.ADMIN, UserRole.TRIAL)
  findAll() {
    return this.userService.findAll();
  }
}
