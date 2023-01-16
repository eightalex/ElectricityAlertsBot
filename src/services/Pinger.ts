import {APP} from '../constants/app';
import {STORAGE_KEY} from '../constants/storageKey';
import {ELECTRICITY_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './message/MessageGenerator';
import {MessageSenderInterface} from './message/MessageSender';

export interface PingerInterface {
    ping(isAvailable: boolean, nowDate: Date): void
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

        this.messageSender.send(message, APP.MESSAGE_CONFIG);
    }
}
