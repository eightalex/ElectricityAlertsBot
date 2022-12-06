import {MONITOR_STATUS} from '../constants/monitorStatus';
import {PreparedMonitor} from '../../types/PreparedMonitor';

export interface MonitorsStatusCheckerInterface {
    check(monitors: PreparedMonitor[]): boolean
}

export class MonitorsStatusChecker implements MonitorsStatusCheckerInterface {
    check(monitors: PreparedMonitor[]): boolean {
        return monitors.some(monitor => {
            return monitor.status !== MONITOR_STATUS.SEEMS_DOWN && monitor.status !== MONITOR_STATUS.DOWN;
        });
    }
}
