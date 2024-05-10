import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EventsGateway } from 'src/events/events.gateway';
import { Utils } from 'src/utils/utils';

@Injectable()
export class StockService {
  constructor(
    @Inject(forwardRef(() => EventsGateway))
    private eventsGateway: EventsGateway,
  ) {}

  stocksData = [];
  stockSan = [];
  tempData = [];

  async formatSan() {
    const sanArray = ['VNINDEX', 'VN30', 'HNXINDEX', 'HNX30', 'UPINDEX'];
    const sortArray = ['VNINDEX', 'VN30', 'HNX', 'HNX30', 'UPCOM'];

    const tempData = this.stocksData;
    const filteredObjects = tempData
      .filter((obj) => sanArray.includes(obj.Ticker))
      .map((obj) => {
        let Ticker = obj.Ticker;
        if (Ticker === 'HNXINDEX') {
          Ticker = 'HNX';
        } else if (Ticker === 'UPINDEX') {
          Ticker = 'UPCOM';
        }
        return {
          Ticker,
          Giahientai: obj.Giahientai,
          'Tang/Giam': obj['Tang/Giam'],
          'Tang/Giam (%)': obj['Tang/Giam (%)'],
        };
      });

    function customSort(a, b) {
      return sortArray.indexOf(a.Ticker) - sortArray.indexOf(b.Ticker);
    }
    const sortedData = filteredObjects.sort(customSort);

    return sortedData;

    // Lặp qua mảng data để lọc và tính toán
  }

  getSan() {
    return this.stockSan;
  }

  async getStocks() {
    const data = this.stocksData.map((item) => item.Ticker);
    console.log('data', data);

    return data;
  }

  async getStockByName(stocks: string[]) {
    return this.stocksData.filter((item) => stocks.includes(item.Ticker));
  }

  async sendStock() {
    this.stocksData = await Utils.formatData(this.tempData);

    this.tempData = [];
    this.stockSan = await this.formatSan();

    await this.eventsGateway.sendStockUpdateSignal();
  }

  async updateStock(data) {
    if (data.data == 'done') {
      this.sendStock();
    } else {
      this.tempData += data.data;
    }
  }
}
