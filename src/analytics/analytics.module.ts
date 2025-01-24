import {Module} from '@nestjs/common';
import {AnalyticsService} from './analytics.service';
import {BinanceModule} from "../binance/binance.module";
import {AnalyticsController} from "./analytics.controller";

@Module({
    imports: [BinanceModule],
    providers: [AnalyticsService],
    controllers: [AnalyticsController],
})
export class AnalyticsModule {
}
