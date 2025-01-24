import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {BinanceKlines} from "./binance.types";

@Injectable()
export class BinanceService {
    API_URL = 'https://api.binance.com';

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    // https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#klinecandlestick-data
    async fetchKlinesBySymbolAndDate(symbol: string, startTime: number, endTime: number) {
        const url = `${this.API_URL}/api/v3/klines?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}&interval=1h`;
        const result = await firstValueFrom(this.httpService.get(url));

        console.log(new Date(startTime), new Date(endTime))

        return result.data as BinanceKlines;
    }
}
