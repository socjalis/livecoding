import {Injectable} from '@nestjs/common';
import {BinanceService} from "../binance/binance.service";
import {BinanceKlines} from "../binance/binance.types";

@Injectable()
export class AnalyticsService {
    API_URL = 'https://api.binance.com';

    constructor(
        private readonly binanceService: BinanceService,
    ) {
    }

    // https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
    async getAndAnalizeHistoricalData(symbol: string, startDate: Date, endDate: Date) {
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();

        const klines = await this.binanceService.fetchKlinesBySymbolAndDate(symbol, startTime, endTime);

        console.log('LENGTH', klines.length);
        return this.analyzeData(klines);
    }

    analyzeData(klines: BinanceKlines) {
        const klinesWithAverages = klines.map(kline => {
            const klineMax = Number(kline[2]);
            const klineMin = Number(kline[3]);
            return {avg: (klineMax + klineMin) / 2, openTime: kline[0], closeTime: kline[6], trades: kline[8]};
        });

        let max: typeof klinesWithAverages[0] = {
            avg: 0,
            closeTime: 0,
            openTime: 0,
            trades: 0,
        }

        let min: typeof klinesWithAverages[0] = {
            avg: Number.MAX_VALUE,
            closeTime: 0,
            openTime: 0,
            trades: 0,
        }

        let maxTrades: typeof klinesWithAverages[0] = {
            avg: 0,
            closeTime: 0,
            openTime: 0,
            trades: 0,
        }

        klinesWithAverages.forEach(kline => {
            if (kline.avg > max.avg) max = kline;
            if (kline.avg < min.avg) min = kline;
            if (kline.trades > kline.trades) maxTrades = kline;
        })

        console.log(min, max)
        return {
            priceChange: klinesWithAverages[0].avg - klinesWithAverages[klinesWithAverages.length - 1].avg,
            maxTradesWithinKline: maxTrades.trades,
            maxPrice: max.avg,
            minPrice: min.avg,
        }
    }
}
