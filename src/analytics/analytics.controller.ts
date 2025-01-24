import {Controller, Get, Param, ParseDatePipe, Query} from '@nestjs/common';
import {AnalyticsService} from "./analytics.service";

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':symbol')
  getHello(
      @Param('symbol') symbol: string,
      @Query('startDate', new ParseDatePipe()) startDate: Date,
      @Query('startDate', new ParseDatePipe()) endDate: Date,
  ) {
    return this.analyticsService.getAndAnalizeHistoricalData(symbol, startDate, endDate);
  }
}
