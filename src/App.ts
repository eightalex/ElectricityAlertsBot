import {APP} from './constants/app';
import {TIME} from './constants/time';
import {MONITORS_CONFIG, MONITORS_CONFIG_DEV} from './constants/monitorsConfig';
import {PingerInterface} from './services/Pinger';
import {StatisticsServiceInterface} from './services/statistics/StatisticsService';
import {DateHelper} from './utils/DateHelper';
import {MonitorsStatusCheckerInterface} from './services/monitors/MonitorsStatusChecker';
import {MonitorsAdapterInterface} from './services/monitors/MonitorsAdapter';
import {BotConfigType} from '../types/BotConfigType';
import {ConfigHelper} from './utils/ConfigHelper';
import {WebhookType} from '../types/WebhookType';
import {MonitorsHelper} from './utils/MonitorsHelper';
import {PreparedCheckResultType} from '../types/PreparedCheckResultType';
import {InformerInterface} from './services/Informer';
import {HeartbeatServiceInterface} from './services/HeartbeatService';

export interface AppInterface {
    multiplyPing(): void
    ping(): void
    webhookUpdate(contents: string): void
    webhookHeartbeat(contents: string): void
}

export class App implements AppInterface {
    private readonly monitorsConfig: BotConfigType[];

    constructor(
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
        private statisticsService: StatisticsServiceInterface,
        private informer: InformerInterface,
        private heartbeatService: HeartbeatServiceInterface,
    ) {
        this.monitorsConfig = APP.MODE === 'production' ? MONITORS_CONFIG : MONITORS_CONFIG_DEV;
    }

    multiplyPing() {
        for (let i = 0; i < 4; i++) {
            this.ping();
            Utilities.sleep(TIME.SECOND * 15);
        }
    }

    ping() {
        const nowDate = new Date();
        const timeString = DateHelper.getTimeString(nowDate);
        const checkResult = this.monitorsStatusChecker.check();
        const monitorsResult = this.monitorsAdapter.prepare(checkResult, this.monitorsConfig);
        const heartbeatResults = this.heartbeatService.checkIsAlive(this.monitorsConfig, nowDate);
        const overallResult = monitorsResult.concat(heartbeatResults);

        overallResult.forEach(monitor => {
            const config = ConfigHelper.getConfig(monitor.id, this.monitorsConfig);
            let dependencyCheckResult: PreparedCheckResultType | null = null;

            if (config.DEPENDENCY_ID !== undefined) {
                dependencyCheckResult = MonitorsHelper.getCheckResult(config.DEPENDENCY_ID, overallResult);
            }

            this.pinger.ping(monitor.status, {config, nowDate, dependencyCheckResult});

            if (config.STATISTICS !== undefined) {
                this.statisticsService.update(monitor.status, {config, nowDate});
            }

            if (config.STATISTICS !== undefined && config.STATISTICS.INFORM_TIME === timeString) {
                this.informer.inform('STATISTICS', {config, nowDate})
            }

            if (config.SCHEDULE !== undefined && config.SCHEDULE.INFORM_TIME === timeString) {
                this.informer.inform('SCHEDULE', {config, nowDate})
            }

            if (config.FUTURE_OUTAGE !== undefined) {
                this.informer.inform('FUTURE_OUTAGE', {config, nowDate})
            }
        });

        overallResult.forEach(monitor => {
            const config = ConfigHelper.getConfig(monitor.id, this.monitorsConfig);
            this.pinger.updateLastState(monitor.status, config);
        });
    }

    webhookUpdate(contents: string) {
        const data: WebhookType = JSON.parse(contents);
        const config = ConfigHelper.getConfig(data.id, this.monitorsConfig);

        this.pinger.ping(data.status, {config, nowDate: new Date()});
    }

    webhookHeartbeat(contents: string) {
        const data: WebhookType = JSON.parse(contents);
        const config = ConfigHelper.getConfig(data.id, this.monitorsConfig);

        this.heartbeatService.update(config);
    }
}
