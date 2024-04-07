import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isAuthenticated = request.isAuthenticated;
    if (isAuthenticated) {
      const isSameDevice = await this.userService.checkDeviceInfo(request);
      if (isSameDevice) {
        return true;
      } else {
        throw new UnauthorizedException('Phiên đăng nhập đã kết thúc');
      }
    } else {
      // throw new UnauthorizedException(
      //   'Bạn cần đăng nhập để truy cập tài nguyên này',
      // );
      return false;
    }
  }
}
