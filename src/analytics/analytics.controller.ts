import {Controller, Get, Param, ParseDatePipe, Query} from '@nestjs/common';
import {AnalyticsService} from "./analytics.service";

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':symbol')
  analyzeData(
      @Param('symbol') symbol: string,
      @Query('startDate', new ParseDatePipe()) startDate: Date,
      @Query('endDate', new ParseDatePipe()) endDate: Date,
  ) {
    return this.analyticsService.getAndAnalizeHistoricalData(symbol, startDate, endDate);
  }
}
