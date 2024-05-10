import { Module, forwardRef } from '@nestjs/common';
import { BuysellController } from './buysell.controller';
import { BuysellService } from './buysell.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Buysell } from './buysell.model';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Buysell]),
    forwardRef(() => EventsModule),
  ],
  controllers: [BuysellController],
  providers: [BuysellService],
  exports: [BuysellService],
})
export class BuysellModule {}
