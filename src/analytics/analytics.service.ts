import { Injectable } from '@nestjs/common';
import {BinanceService} from "../binance/binance.service";
import {BinanceKline} from "../binance/binance.types";

@Injectable()
export class AnalyticsService {
  API_URL = 'https://api.binance.com';

  constructor(
      private readonly binanceService: BinanceService,
  ) {
  }

  // https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
  async getAndAnalizeHistoricalData(symbol: string, startDate: Date, endDate: Date){
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    const klines = await this.binanceService.fetchKlinesBySymbolAndDate(symbol, startTime, endTime);

  }

  getMaximumPrice(klines: BinanceKlines)
}
