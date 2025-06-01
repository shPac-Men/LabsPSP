import { Injectable } from '@nestjs/common';
import { Stock } from './stocks/entities/stock.entity';
import { FileService } from './stocks/file.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  findAll(): Stock[] {
    const stocks = this.fileService.read();

    return stocks;
  }
}
