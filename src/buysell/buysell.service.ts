import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Buysell } from './buysell.model';

@Injectable()
export class BuysellService {
  constructor(
    @InjectModel(Buysell)
    private buysellModel: typeof Buysell,
  ) {}
}
