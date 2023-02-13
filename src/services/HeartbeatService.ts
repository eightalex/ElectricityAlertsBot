import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {DateHelper} from '../utils/DateHelper';
import {TIME} from '../constants/time';
import {PreparedCheckResultType} from '../../types/PreparedCheckResultType';
import {ConfigHelper} from '../utils/ConfigHelper';

export interface HeartbeatServiceInterface {
    update(config: BotConfigType): void
    checkIsAlive(config: BotConfigType[], nowDate: Date): PreparedCheckResultType[]
}

export class HeartbeatService implements HeartbeatServiceInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    update(config: BotConfigType) {
        this.setLastHeartbeat(config.ID, new Date().getTime());
    }

    checkIsAlive(config: BotConfigType[], nowDate: Date): PreparedCheckResultType[] {
        const heartbeatConfigs = ConfigHelper.getHeartbeatConfigs(config);

        return heartbeatConfigs.map(config => {
            const lastHeartbeat = this.getLastHeartbeat(config.ID);
            const timeDifference = DateHelper.getDifference(nowDate, new Date(lastHeartbeat));
            const isAvailable = timeDifference < (TIME.MINUTE * 2);

            return {
                id: config.ID,
                name: config.NAME,
                status: isAvailable,
            }
        });
    }

    private getLastHeartbeat(id: number): number {
        const lastHeartbeat = this.userProperties.getProperty(STORAGE_KEY.LAST_HEARTBEAT + id);

        if (lastHeartbeat === null) {
            const time = new Date().getTime();
            this.setLastHeartbeat(id, time)
            return time;
        }

        return new Date(Number(lastHeartbeat)).getTime();
    }

    private setLastHeartbeat(id: number, time: number): void {
        this.userProperties.setProperty(STORAGE_KEY.LAST_HEARTBEAT + id, String(time));
    }
}
