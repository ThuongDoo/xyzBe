import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post()
  updateStock(@Body() data) {
    return this.stockService.updateStock(data);
  }

  @Get()
  getAll() {
    return this.stockService.getStocks();
  }

  @Get('/san')
  getSan() {
    return this.stockService.getSan();
  }

  @Get('/:stocks')
  getStocks(@Param('stocks') stocks: string) {
    const stocksArray = stocks.split(',');
    return this.stockService.getStockByName(stocksArray);
  }
}
