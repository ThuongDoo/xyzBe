import { Module } from '@nestjs/common';
import { BuysellController } from './buysell.controller';
import { BuysellService } from './buysell.service';
import { EventsGateway } from 'src/events/events.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Buysell } from './buysell.model';
import { StockService } from 'src/stock/stock.service';

@Module({
  imports: [SequelizeModule.forFeature([Buysell])],
  controllers: [BuysellController],
  providers: [BuysellService, EventsGateway, StockService],
  exports: [EventsGateway],
})
export class BuysellModule {}
