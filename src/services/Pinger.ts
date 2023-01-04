import {STORAGE_KEY} from '../constants/storageKey';
import {ELECTRICITY_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './MessageGenerator';
import {TelegramServiceInterface} from './TelegramService';

export interface PingerInterface {
    ping(isAvailable: boolean, nowDate: Date): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private messageGenerator: MessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    ping(isAvailable: boolean, nowDate: Date): void {
        const lastState = this.userProperties.getProperty(STORAGE_KEY.LAST_STATE);
        const lastTime = this.userProperties.getProperty(STORAGE_KEY.LAST_TIME) || '0';

        if (Boolean(lastState) === isAvailable) {
            return;
        }

        this.userProperties.setProperties({
            [STORAGE_KEY.LAST_STATE]: isAvailable ? ELECTRICITY_STATE.AVAILABLE : ELECTRICITY_STATE.NOT_AVAILABLE,
            [STORAGE_KEY.LAST_TIME]: String(nowDate.getTime()),
        });

        const message = this.messageGenerator.generate({isAvailable, lastTime, nowDate})
        this.telegramService.sendMessage(message);
    }
}
