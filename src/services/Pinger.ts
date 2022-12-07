import {STORAGE_KEY} from '../constants/storageKey';
import {STATE} from '../constants/state';
import {MonitorsFetcherInterface} from './monitors/MonitorsFetcher';
import {MonitorsAdapterInterface} from './monitors/MonitorsAdapter';
import {MonitorsStatusCheckerInterface} from './monitors/MonitorsStatusChecker';
import {MonitorsConfigGeneratorInterface} from './monitors/MonitorsConfigGenerator';
import {MessageGeneratorInterface} from './MessageGenerator';
import {TelegramServiceInterface} from './TelegramService';

export interface PingerInterface {
    ping(): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;
    private readonly monitorsConfig: Record<string, number>;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        monitorsConfigGenerator: MonitorsConfigGeneratorInterface,
        private monitorsFetcher: MonitorsFetcherInterface,
        private monitorsAdapter: MonitorsAdapterInterface,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private messageGenerator: MessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
        this.monitorsConfig = monitorsConfigGenerator.generate(process.env.UPTIME_ROBOT_MONITORS);
    }

    ping() {
        const monitors = this.monitorsFetcher.fetch(this.monitorsConfig);
        const preparedMonitors = this.monitorsAdapter.prepare(monitors);
        const isAvailable = this.monitorsStatusChecker.check(preparedMonitors);
        const lastState = this.userProperties.getProperty(STORAGE_KEY.LAST_STATE);
        const lastTime = this.userProperties.getProperty(STORAGE_KEY.LAST_TIME);
        const nowDate = new Date();

        // @ts-ignore because types '1' and '' already in production
        if (lastState == isAvailable) {
            return;
        }

        this.userProperties.setProperties({
            [STORAGE_KEY.LAST_STATE]: isAvailable ? STATE.AVAILABLE : STATE.NOT_AVAILABLE,
            [STORAGE_KEY.LAST_TIME]: String(nowDate.getTime()),
        });

        const message = this.messageGenerator.generate({isAvailable, lastTime, nowDate})
        this.telegramService.sendMessage(message);
    }
}
