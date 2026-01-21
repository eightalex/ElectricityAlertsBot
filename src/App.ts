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
import {MonitorsHelper} from './utils/MonitorsHelper';
import {PreparedCheckResultType} from '../types/PreparedCheckResultType';
import {InformerInterface} from './services/Informer';

export interface AppInterface {
    multiplyPing(): void
    ping(): void
}

export class App implements AppInterface {
    private readonly monitorsConfig: BotConfigType[];

    constructor(
        private pinger: PingerInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
        private statisticsService: StatisticsServiceInterface,
        private informer: InformerInterface,
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
        const overallResult = monitorsResult;

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
        });

        overallResult.forEach(monitor => {
            const config = ConfigHelper.getConfig(monitor.id, this.monitorsConfig);
            this.pinger.updateLastState(monitor.status, config);
        });
    }

}
