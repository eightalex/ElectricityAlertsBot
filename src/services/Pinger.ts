import {STORAGE_KEY} from '../constants/storageKey';
import {STATE} from '../constants/state';
import {MessageGeneratorInterface} from './MessageGenerator';
import {TelegramServiceInterface} from './TelegramService';
import {MonitorsStatusCheckerInterface} from './monitors/MonitorsStatusChecker';

export interface PingerInterface {
    ping(): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private messageGenerator: MessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    ping(): void {
        const isAvailable = this.monitorsStatusChecker.check();
        const lastState = this.userProperties.getProperty(STORAGE_KEY.LAST_STATE);
        const lastTime = this.userProperties.getProperty(STORAGE_KEY.LAST_TIME) || '0';

        // @ts-ignore because types '1' and '' already in production
        if (lastState == isAvailable) {
            return;
        }

        this.userProperties.setProperties({
            [STORAGE_KEY.LAST_STATE]: isAvailable ? STATE.AVAILABLE : STATE.NOT_AVAILABLE,
            [STORAGE_KEY.LAST_TIME]: String(new Date().getTime()),
        });

        const message = this.messageGenerator.generate({isAvailable, lastTime})
        this.telegramService.sendMessage(message);
    }
}
