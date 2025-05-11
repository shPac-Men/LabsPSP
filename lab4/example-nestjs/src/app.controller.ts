import { Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { Stock } from './stocks/entities/stock.entity';
//import { StocksService } from './app.service';
import { StocksService } from './stocks/stocks.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}
  @Get()
  findAll(@Query('title') title?: string): Stock[] {
    return this.stocksService.findAll(title);
  }
}