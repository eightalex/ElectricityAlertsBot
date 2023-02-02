import {STORAGE_KEY} from '../constants/storageKey';
import {STORAGE_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './message/MessageGenerator';
import {MessageSenderInterface} from './message/MessageSender';
import {HouseConfigType} from '../../types/MonitorsConfigType';
import {PreparedCheckResultType} from '../../types/PreparedCheckResultType';
import {ForecastGeneratorInterface} from './message/ForecastGenerator';

type PingOptions = {
    config: HouseConfigType
    nowDate: Date
    dependencyCheckResult?: PreparedCheckResultType | null
}

export interface PingerInterface {
    ping(isAvailable: boolean, options: PingOptions): void
    updateLastState(isAvailable: boolean, config: HouseConfigType): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private messageGenerator: MessageGeneratorInterface,
        private messageSender: MessageSenderInterface,
        private forecastGenerator: ForecastGeneratorInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    private isStateChanged(isAvailable: boolean, id: number): boolean {
        const lastState = this.userProperties.getProperty(STORAGE_KEY.LAST_STATE + id);
        return Boolean(lastState) !== isAvailable;
    }

    ping(isAvailable: boolean, options: PingOptions): void {
        const key = {
            lastState: STORAGE_KEY.LAST_STATE + options.config.ID,
            lastTime: STORAGE_KEY.LAST_TIME + options.config.ID,
            isForecastSent: STORAGE_KEY.IS_FORECAST_SENT + options.config.ID,
        };

        if (options.dependencyCheckResult) {
            const {status, id} = options.dependencyCheckResult;
            const isStateChanged = this.isStateChanged(status, id);
            const isForecastSent = this.userProperties.getProperty(key.isForecastSent);
            const forecastMessage = this.forecastGenerator.generate(isAvailable, status);

            if (isStateChanged && !isForecastSent && forecastMessage !== null) {
                this.messageSender.send(forecastMessage, options.config.TELEGRAM_CHATS);
                this.userProperties.setProperty(key.isForecastSent, STORAGE_STATE.TRUE);
            }
        }

        if (!this.isStateChanged(isAvailable, options.config.ID)) {
            return;
        }

        const lastTime = this.userProperties.getProperty(key.lastTime) || '0';
        const message = this.messageGenerator.generate({isAvailable, lastTime, nowDate: options.nowDate})

        this.messageSender.send(message, options.config.TELEGRAM_CHATS);

        this.userProperties.setProperties({
            [key.lastTime]: String(options.nowDate.getTime()),
            [key.isForecastSent]: STORAGE_STATE.FALSE,
        });
    }

    updateLastState(isAvailable: boolean, config: HouseConfigType): void {
        if (!this.isStateChanged(isAvailable, config.ID)) {
            return;
        }

        this.userProperties.setProperty(
            STORAGE_KEY.LAST_STATE + config.ID,
            isAvailable ? STORAGE_STATE.TRUE : STORAGE_STATE.FALSE,
        );
    }
}
