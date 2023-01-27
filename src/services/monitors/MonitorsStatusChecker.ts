import {MONITOR_STATUS} from '../../constants/monitorStatus';
import {MonitorsFetcherInterface} from './MonitorsFetcher';
import {MonitorsCheckResultType} from '../../../types/MonitorsCheckResultType';

export interface MonitorsStatusCheckerInterface {
    check(): MonitorsCheckResultType[]
}

export class MonitorsStatusChecker implements MonitorsStatusCheckerInterface {
    constructor(
        private monitorsFetcher: MonitorsFetcherInterface,
    ) {}

    check(): MonitorsCheckResultType[] {
        const monitors = this.monitorsFetcher.fetch();

        return monitors.map(monitor => ({
            id: monitor.id,
            name: monitor.friendly_name,
            status: monitor.status === MONITOR_STATUS.UP,
        }));
    }
}
