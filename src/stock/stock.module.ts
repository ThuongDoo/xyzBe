import { Module, forwardRef } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { EventsGateway } from 'src/events/events.gateway';
import { BuysellService } from 'src/buysell/buysell.service';

@Module({
  controllers: [StockController],
  providers: [StockService, EventsGateway],
  exports: [EventsGateway],
})
export class StockModule {}
