import {APP} from './constants/app';
import {MONITORS_CONFIG, MONITORS_CONFIG_DEV} from './constants/monitorsConfig';
import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';
import {DateHelperInterface} from './utils/DateHelper';
import {MonitorsStatusCheckerInterface} from './services/monitors/MonitorsStatusChecker';
import {MonitorsAdapterInterface} from './services/monitors/MonitorsAdapter';
import {MonitorsConfigType} from '../types/MonitorsConfigType';
import {ConfigHelper} from './utils/ConfigHelper';
import {WebhookType} from '../types/WebhookType';
import {MonitorsHelper} from './utils/MonitorsHelper';
import {PreparedCheckResultType} from '../types/PreparedCheckResultType';
import {InformerInterface} from './services/Informer';

export interface AppInterface {
    ping(): void
    webhookUpdate(contents: string): void
}

export class App implements AppInterface {
    private readonly monitorsConfig: MonitorsConfigType;

    constructor(
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
        private statisticsService: StatisticsServiceInterface,
        private dateHelper: DateHelperInterface,
        private informer: InformerInterface,
    ) {
        this.monitorsConfig = APP.MODE === 'production' ? MONITORS_CONFIG : MONITORS_CONFIG_DEV;
    }

    ping() {
        const nowDate = new Date();
        const timeString = this.dateHelper.getTimeString(nowDate);
        const dateString = this.dateHelper.getDateString(nowDate);
        const checkResult = this.monitorsStatusChecker.check();
        const preparedResult = this.monitorsAdapter.prepare(checkResult, this.monitorsConfig);

        preparedResult.forEach(result => {
            const config = ConfigHelper.getConfig(result.id, this.monitorsConfig);
            let dependencyCheckResult: PreparedCheckResultType | null = null;

            if (config.DEPENDENCY_ID !== undefined) {
                dependencyCheckResult = MonitorsHelper.getCheckResult(config.DEPENDENCY_ID, preparedResult);
            }

            this.pinger.ping(result.status, {config, nowDate, dependencyCheckResult});

            if (config.STATISTICS.IS_ENABLED) {
                this.statisticsService.update(result.status, {config, nowDate});
                this.informer.inform('STATISTICS', {config, timeString, dateString})
            }

            if (config.SCHEDULE.IS_ENABLED) {
                this.informer.inform('SCHEDULE', {config, timeString, dateString})
            }

            this.informer.reset(dateString, result.id);
        });

        preparedResult.forEach(result => {
            const config = ConfigHelper.getConfig(result.id, this.monitorsConfig);
            this.pinger.updateLastState(result.status, config);
        });
    }

    webhookUpdate(contents: string) {
        const data: WebhookType = JSON.parse(contents);
        const config = ConfigHelper.getConfig(data.id, this.monitorsConfig);

        this.pinger.ping(data.status, {config, nowDate: new Date()});
    }
}
