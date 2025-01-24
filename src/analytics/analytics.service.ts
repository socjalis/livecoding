import { BadRequestException, Injectable } from '@nestjs/common';
import { BinanceService } from '../binance/binance.service';
import { BinanceKlines } from '../binance/binance.types';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly binanceService: BinanceService,
  ) {
  }

  // https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
  async getAndAnalizeHistoricalData(symbol: string, startDate: Date, endDate: Date) {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    const klines = await this.binanceService.fetchKlinesBySymbolAndDate(symbol, startTime, endTime);

    if (klines.length === 0) {
      throw new BadRequestException('Specified market data does not include any klines');
    }

    return this.analyzeData(klines);
  }

  analyzeData(klines: BinanceKlines) {
    const klinesWithAverages = klines.map(kline => {
      const klineMax = Number(kline[2]);
      const klineMin = Number(kline[3]);
      // docs explain array structure
      // https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
      return { avg: (klineMax + klineMin) / 2, openTime: kline[0], closeTime: kline[6], trades: kline[8] };
    });

    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    let maxTrades = 0;

    klinesWithAverages.forEach(kline => {
      if (kline.avg > max) max = kline.avg;
      if (kline.avg < min) min = kline.avg;
      if (kline.trades > maxTrades) maxTrades = kline.trades;
    });

    return {
      priceChange: klinesWithAverages[0].avg - klinesWithAverages[klinesWithAverages.length - 1].avg,
      maxTradesWithinKline: maxTrades,
      maxPrice: max,
      minPrice: min,
    };
  }
}
