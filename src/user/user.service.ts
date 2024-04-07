import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(phone: string): Promise<User> {
    return this.userRepository.findOneBy({ phone });
  }

  async addOne(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    try {
      const user = this.userRepository.create({
        phone: createUserDto.phone,
        name: createUserDto.name,
        password: hashPassword,
        email: createUserDto.email,
        roles: createUserDto.roles,
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  async saveDeviceInfo(req: Request) {
    const userData: any = req.user;
    const deviceInfo = req.headers['user-agent'];

    const user = await this.userRepository.findOneBy({ phone: userData.phone });
    user.deviceInfo = deviceInfo;
    await this.userRepository.save(user);
  }

  async checkDeviceInfo(req: Request) {
    const userData: any = req.user;
    const deviceInfo = req.headers['user-agent'];

    const user = await this.userRepository.findOneBy({ phone: userData.phone });
    if (deviceInfo === user.deviceInfo) {
      return true;
    } else {
      return false;
    }
  }
}
