import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(phone: string): Promise<User> {
    return this.userModel.findOne({ where: { phone } });
  }

  async addOne(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    try {
      const user = await this.userModel.create({
        phone: createUserDto.phone,
        name: createUserDto.name,
        password: hashPassword,
        email: createUserDto.email,
        roles: createUserDto.roles,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async saveDeviceInfo(req: Request) {
    const userData: any = req.user;
    const deviceInfo = req.headers['user-agent'];

    const user = await this.userModel.findOne({
      where: { phone: userData.phone },
    });
    user.deviceInfo = deviceInfo;
    await user.save();
  }
}
