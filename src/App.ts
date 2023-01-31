import {MONITORS_CONFIG} from './constants/monitorsConfig';
import {STORAGE_KEY} from './constants/storageKey';
import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';
import {StatisticsInformerInterface} from './services/statistics/StatisticsInformer';
import {DateHelperInterface} from './utils/DateHelper';
import {MonitorsStatusCheckerInterface} from './services/monitors/MonitorsStatusChecker';
import {ScheduleInformerInterface} from './services/ScheduleInformer';
import {MonitorsAdapterInterface} from './services/monitors/MonitorsAdapter';
import {HouseConfigType} from '../types/MonitorsConfigType';
import {ConfigHelper} from './utils/ConfigHelper';
import {WebhookType} from '../types/WebhookType';

type InformOptions = {
    config: HouseConfigType
    timeString: string
    dateString: string
}

export interface AppInterface {
    ping(): void
    webhookUpdate(contents: string): void
}

export class App implements AppInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
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
        const checkResult = this.monitorsStatusChecker.check();
        const preparedResult = this.monitorsAdapter.prepare(checkResult, MONITORS_CONFIG);

        preparedResult.forEach(result => {
            const config = ConfigHelper.getConfig(result.id, MONITORS_CONFIG);

            this.pinger.ping(result.status, {config, nowDate});

            if (config.STATISTICS.IS_ENABLED) {
                this.statisticsService.update(result.status, {config, nowDate});
                this.inform('STATISTICS', {config, timeString, dateString})
            }

            if (config.SCHEDULE.IS_ENABLED) {
                this.inform('SCHEDULE', {config, timeString, dateString})
            }

            this.reset(dateString, result.id);
        });
    }

    webhookUpdate(contents: string) {
        const data: WebhookType = JSON.parse(contents);
        const config = ConfigHelper.getConfig(data.id, MONITORS_CONFIG);

        this.pinger.ping(data.status, {config, nowDate: new Date()});
    }

    private inform(type: 'STATISTICS' | 'SCHEDULE', options: InformOptions): void {
        // @ts-ignore
        let storageKey = STORAGE_KEY[type + '_INFORMED_DATE'] + options.config.ID;

        if (options.dateString === this.userProperties.getProperty(storageKey)) {
            return;
        }

        if (options.timeString !== options.config[type].INFORM_TIME) {
            return;
        }

        switch (type) {
            case 'STATISTICS':
                this.statisticsInformer.inform(options.config);
                break;
            case 'SCHEDULE':
                this.scheduleInformer.inform(options.config);
                break;
        }

        this.userProperties.setProperty(storageKey, options.dateString);
    }

    private reset(dateString: string, id: number) {
        const isInformedSchedule = this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE + id);
        const isInformedStatistics = this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE + id);

        if (isInformedSchedule !== dateString || isInformedStatistics !== dateString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.SCHEDULE_INFORMED_DATE + id]: '',
                [STORAGE_KEY.STATISTICS_INFORMED_DATE + id]: '',
            });
        }
    }
}
