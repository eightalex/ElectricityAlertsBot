import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';
import {StatisticsInformerInterface} from './services/statistics/StatisticsInformer';
import {DateHelperInterface} from './utils/DateHelper';
import {MonitorsStatusCheckerInterface} from './services/monitors/MonitorsStatusChecker';
import {ScheduleInformerInterface} from './services/ScheduleInformer';

export interface AppInterface {
    ping(): void
}

export class App implements AppInterface {
    constructor(
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private statisticsService: StatisticsServiceInterface,
        private statisticsInformer: StatisticsInformerInterface,
        private scheduleInformer: ScheduleInformerInterface,
        private dateHelper: DateHelperInterface,
    ) {}

    ping() {
        const nowDate = new Date();
        const timeString = this.dateHelper.getTimeString(nowDate);
        const isAvailable = this.monitorsStatusChecker.check();

        this.pinger.ping(isAvailable, nowDate);
        this.statisticsService.update(isAvailable, nowDate);

        if (timeString === process.env.STATISTICS_INFORM_TIME) {
            this.statisticsInformer.inform();
        }

        if (timeString === process.env.SCHEDULE_INFORM_TIME) {
            this.scheduleInformer.inform();
        }
    }
}
