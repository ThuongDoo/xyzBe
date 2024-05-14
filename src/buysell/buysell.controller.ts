import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BuysellService } from './buysell.service';
import { AuthenticatedGuard } from 'src/shared/guard/authenticated.guard';

@Controller('buysell')
export class BuysellController {
  constructor(private buysellService: BuysellService) {}

  @Post()
  updateBuysell(@Body() data: any) {
    return this.buysellService.updateBuysell(data);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getBuysell(
    @Query('date') dateFilter: string,
    @Query('ticker') ticker: string,
    @Query('limit') limit: string,
  ) {
    return this.buysellService.filterBuysell(dateFilter, ticker, limit);
  }

  @Post('/import')
  importFile(@Body() data) {
    return this.buysellService.importBuysell(data);
  }

  //TODO: delete
  @Get('/md/create')
  createmd() {
    return this.buysellService.createmd();
  }

  @Get('/md/get')
  getmd() {
    return this.buysellService.getmd();
  }
}
