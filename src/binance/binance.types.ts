export interface BinanceKline {
    symbol: string;
    interval: string;
    startTime: number;
    endTime: number;
    timeZone: string;
    limit: number;
}