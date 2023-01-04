import {APP} from './constants/app';
import {STORAGE_KEY} from './constants/storageKey';
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
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private statisticsService: StatisticsServiceInterface,
        private statisticsInformer: StatisticsInformerInterface,
        private scheduleInformer: ScheduleInformerInterface,
        private dateHelper: DateHelperInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    ping() {
        const nowDate = new Date();
        const timeString = this.dateHelper.getTimeString(nowDate);
        const dateString = this.dateHelper.getDateString(nowDate);
        const isAvailable = this.monitorsStatusChecker.check();

        this.pinger.ping(isAvailable, nowDate);

        if (APP.STATISTICS.IS_ENABLED) {
            this.statisticsService.update(isAvailable, nowDate);
        }

        this.informSchedule(timeString, dateString);
        this.informStatistics(timeString, dateString);
        this.reset(dateString);
    }

    private informSchedule(timeString: string, dateString: string) {
        if (!APP.SCHEDULE.IS_ENABLED) {
            return;
        }

        if (dateString === this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE)) {
            return;
        }

        if (timeString === process.env.SCHEDULE_INFORM_TIME) {
            this.scheduleInformer.inform();
            this.userProperties.setProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE, dateString);
        }
    }

    private informStatistics(timeString: string, dateString: string) {
        if (!APP.STATISTICS.IS_ENABLED) {
            return;
        }

        if (dateString === this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE)) {
            return;
        }

        if (timeString === process.env.STATISTICS_INFORM_TIME) {
            this.statisticsInformer.inform();
            this.userProperties.setProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE, dateString);
        }
    }

    private reset(dateString: string) {
        const isInformedSchedule = this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE);
        const isInformedStatistics = this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE);

        if (isInformedSchedule !== dateString || isInformedStatistics !== dateString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.SCHEDULE_INFORMED_DATE]: '',
                [STORAGE_KEY.STATISTICS_INFORMED_DATE]: '',
            });
        }
    }
}
