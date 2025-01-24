import { BinanceService } from './binance.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';

describe('binance service', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BinanceService],
    }).compile();
  });

  describe('binance service', () => {
    it('should fetch data from binance api', async () => {
      const binanceService = app.get(BinanceService);

      // mocked http calls in another test
      const result = await binanceService.fetchKlinesBySymbolAndDate(
        'ETHBTC',
        1737429025982,
        1737556569041,
      );

      expect(result.length).toBe(35);
    });
  });
});