import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { BuysellService } from './buysell.service';

@Controller('buysell')
export class BuysellController {
  constructor(private buysellService: BuysellService) {}

  @Post()
  updateBuysell() {}

  @Get()
  getBuysell(
    @Query('date') dateFilter: string,
    @Query('ticker') ticker: string,
    @Query('limit') limit: string,
  ) {}

  @Post('/import')
  importFile(@Body() data) {}

  @Patch()
  updateMuaMoi() {}
}
