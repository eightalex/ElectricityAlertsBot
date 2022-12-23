import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';

export interface AppInterface {
    ping(): void
}

export class App implements AppInterface {
    constructor(
        private pinger: PingerInterface,
        private statisticsService: StatisticsServiceInterface,
    ) {}

    ping() {
        this.pinger.ping();
        this.statisticsService.update();
    }
}
