import {APP} from '../constants/app';
import {STORAGE_KEY} from '../constants/storageKey';
import {ELECTRICITY_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './message/MessageGenerator';
import {MessageSenderInterface} from './message/MessageSender';
import {PreparedCheckResultType} from '../../types/PreparedCheckResultType';

export interface PingerInterface {
    ping(checkResult: PreparedCheckResultType[], nowDate: Date): void
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

    ping(checkResult: PreparedCheckResultType[], nowDate: Date): void {
        checkResult.forEach(check => {
            const key = {
                lastState: STORAGE_KEY.LAST_STATE + '_' + check.id,
                lastTime: STORAGE_KEY.LAST_TIME + '_' + check.id,
            };
            const lastState = this.userProperties.getProperty(key.lastState);
            const lastTime = this.userProperties.getProperty(key.lastTime) || '0';

            if (Boolean(lastState) === check.status) {
                return;
            }

            this.userProperties.setProperties({
                [key.lastState]: check.status ? ELECTRICITY_STATE.AVAILABLE : ELECTRICITY_STATE.NOT_AVAILABLE,
                [key.lastTime]: String(nowDate.getTime()),
            });

            const message = this.messageGenerator.generate({isAvailable: check.status, lastTime, nowDate})

            this.messageSender.send(message, APP.TELEGRAM.MESSAGE_CONFIG);
        });
    }
}
