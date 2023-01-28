import {PreparedCheckResultType} from '../../../types/PreparedCheckResultType';
import {MonitorsCheckResultType} from '../../../types/MonitorsCheckResultType';
import {MonitorsConfigType} from '../../../types/MonitorsConfigType';

export interface MonitorsAdapterInterface {
    prepare(monitors: MonitorsCheckResultType[], appConfig: MonitorsConfigType): PreparedCheckResultType[]
}

export class MonitorsAdapter implements MonitorsAdapterInterface {
    prepare(monitors: MonitorsCheckResultType[], appConfig: MonitorsConfigType): PreparedCheckResultType[] {
        return appConfig
            .filter(config => config.MONITORS !== undefined)
            .map(config => {
                const statuses = monitors
                    .filter(check => config.MONITORS !== undefined && config.MONITORS.includes(check.id))
                    .map(check => check.status);

                return {
                    id: config.ID,
                    name: config.NAME,
                    status: statuses.some(status => status),
                }
            });
    }
}
