import {APP} from '../../constants/app';
import {MONITOR_STATUS} from '../../constants/monitorStatus';
import {MonitorsFetcherInterface} from './MonitorsFetcher';
import {MonitorsAdapterInterface} from './MonitorsAdapter';
import {MonitorsConfigGeneratorInterface} from './MonitorsConfigGenerator';

export interface MonitorsStatusCheckerInterface {
    check(): boolean
}

export class MonitorsStatusChecker implements MonitorsStatusCheckerInterface {
    private readonly monitorsConfig: Record<string, number>;

    constructor(
        monitorsConfigGenerator: MonitorsConfigGeneratorInterface,
        private monitorsFetcher: MonitorsFetcherInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
    ) {
        this.monitorsConfig = monitorsConfigGenerator.generate(APP.UPTIME_ROBOT.MONITORS);
    }

    check(): boolean {
        const monitors = this.monitorsFetcher.fetch(this.monitorsConfig);
        const preparedMonitors = this.monitorsAdapter.prepare(monitors);

        return preparedMonitors.some(monitor => {
            return monitor.status !== MONITOR_STATUS.SEEMS_DOWN && monitor.status !== MONITOR_STATUS.DOWN;
        });
    }
}
