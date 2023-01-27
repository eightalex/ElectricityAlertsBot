import {STORAGE_KEY} from '../constants/storageKey';
import {ELECTRICITY_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './message/MessageGenerator';
import {MessageSenderInterface} from './message/MessageSender';
import {HouseConfigType} from '../../types/AppConfigType';

type PingOptions = {
    config: HouseConfigType
    nowDate: Date
}

export interface PingerInterface {
    ping(isAvailable: boolean, options: PingOptions): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private messageGenerator: MessageGeneratorInterface,
        private messageSender: MessageSenderInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    ping(isAvailable: boolean, options: PingOptions): void {
        const key = {
            lastState: STORAGE_KEY.LAST_STATE + options.config.ID,
            lastTime: STORAGE_KEY.LAST_TIME + options.config.ID,
        };
        const lastState = this.userProperties.getProperty(key.lastState);
        const lastTime = this.userProperties.getProperty(key.lastTime) || '0';

        if (Boolean(lastState) === isAvailable) {
            return;
        }

        this.userProperties.setProperties({
            [key.lastState]: isAvailable ? ELECTRICITY_STATE.AVAILABLE : ELECTRICITY_STATE.NOT_AVAILABLE,
            [key.lastTime]: String(options.nowDate.getTime()),
        });

        const message = this.messageGenerator.generate({isAvailable, lastTime, nowDate: options.nowDate})

        this.messageSender.send(message, options.config.TELEGRAM_CHATS);
    }
}
