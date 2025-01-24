import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AnalyticsController} from "./analytics.controller";
import {BinanceModule} from "../binance/binance.module";
import {AnalyticsService} from "./analytics.service";

describe('AnalyticsController', () => {
  let app: TestingModule;
  let analyticsService: AnalyticsService;

  beforeEach(() => {

  });

  describe('analizeMarketData', () => {
    it('should process data', () => {
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
