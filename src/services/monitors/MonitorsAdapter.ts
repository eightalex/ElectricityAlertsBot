import {PreparedMonitor} from '../../../types/PreparedMonitor';

export interface MonitorsAdapterInterface {
    prepare(monitors: UptimeRobot.MonitorType[]): PreparedMonitor[]
}

export class MonitorsAdapter implements MonitorsAdapterInterface {
    prepare(monitors: UptimeRobot.MonitorType[]): PreparedMonitor[] {
        return monitors.map(monitor => {
            return {
                id: monitor.id,
                status: monitor.status,
                friendly_name: monitor.friendly_name,
            };
        });
    }
}
