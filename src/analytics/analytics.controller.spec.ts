import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { BinanceService } from '../binance/binance.service';
import { BinanceModule } from '../binance/binance.module';
import { MOCK_DATA } from '../../test/mockData';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsController', () => {
  let app: TestingModule;

  const binanceService = { fetchKlinesBySymbolAndDate: () => MOCK_DATA };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [AnalyticsService],
      imports: [BinanceModule],
    })
      .overrideProvider(BinanceService)
      .useValue(binanceService)
      .compile();
  });

  describe('analytics', () => {
    it('should calculate max price', async () => {
      const controller = app.get(AnalyticsController);
      const result = await controller.analyzeData(
        'ETHBTC',
        new Date('2025-01-20T14:36:09.041Z'),
        new Date('2025-01-21T14:36:09.041Z'),
      );
      expect(result.maxPrice).toBe(0.03196);
    });

    it('should calculate min price', async () => {
      const controller = app.get(AnalyticsController);
      const result = await controller.analyzeData(
        'ETHBTC',
        new Date('2025-01-20T14:36:09.041Z'),
        new Date('2025-01-21T14:36:09.041Z'),
      );
      expect(result.minPrice).toBe(0.031135);
    });

    it('should calculate price change', async () => {
      const controller = app.get(AnalyticsController);
      const result = await controller.analyzeData(
        'ETHBTC',
        new Date('2025-01-20T14:36:09.041Z'),
        new Date('2025-01-21T14:36:09.041Z'),
      );
      expect(result.priceChange).toBe(0.0000849999999999948);
    });

    it('should calculate maximum number of trades within a kline', async () => {
      const controller = app.get(AnalyticsController);
      const result = await controller.analyzeData(
        'ETHBTC',
        new Date('2025-01-20T14:36:09.041Z'),
        new Date('2025-01-21T14:36:09.041Z'),
      );
      expect(result.maxTradesWithinKline).toBe(7112);
    });
  });
});
