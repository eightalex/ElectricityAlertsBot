import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';
import {StatisticsInformerInterface} from './services/statistics/StatisticsInformer';
import {DateHelperInterface} from './utils/DateHelper';

export interface AppInterface {
    ping(): void
}

export class App implements AppInterface {
    constructor(
        private pinger: PingerInterface,
        private statisticsService: StatisticsServiceInterface,
        private statisticsInformer: StatisticsInformerInterface,
        private dateHelper: DateHelperInterface,
    ) {}

    ping() {
        const nowDate = new Date();
        const timeString = this.dateHelper.getTimeString(nowDate);

        this.pinger.ping();
        this.statisticsService.update();

        if (timeString === process.env.STATISTICS_INFORM_TIME) {
            this.statisticsInformer.inform();
        }
    }
}
