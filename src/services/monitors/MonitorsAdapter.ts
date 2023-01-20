import {PreparedCheckResultType} from '../../../types/PreparedCheckResultType';
import {MonitorsCheckResultType} from '../../../types/MonitorsCheckResultType';
import {AppConfigType} from '../../../types/AppConfigType';

export interface MonitorsAdapterInterface {
    prepare(monitors: MonitorsCheckResultType[], appConfig: AppConfigType): PreparedCheckResultType[]
}

export class MonitorsAdapter implements MonitorsAdapterInterface {
    prepare(monitors: MonitorsCheckResultType[], appConfig: AppConfigType): PreparedCheckResultType[] {
        return appConfig.map(config => {
            const statuses = monitors
                .filter(check => config.MONITORS.includes(check.id))
                .map(check => check.status);

            return {
                id: config.ID,
                name: config.NAME,
                status: statuses.some(status => status),
            }
        });
    }
}
