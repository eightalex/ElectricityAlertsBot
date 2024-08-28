import {STORAGE_KEY} from '../constants/storageKey';
import {STORAGE_STATE} from '../constants/electricityState';
import {MessageGeneratorInterface} from './message/MessageGenerator';
import {BotConfigType} from '../../types/BotConfigType';
import {PreparedCheckResultType} from '../../types/PreparedCheckResultType';
import {ForecastGeneratorInterface} from './message/ForecastGenerator';
import {TelegramServiceInterface} from './TelegramService';

export type PingOptions = {
    config: BotConfigType
    nowDate: Date
    dependencyCheckResult?: PreparedCheckResultType | null
}

export interface PingerInterface {
    ping(isAvailable: boolean, options: PingOptions): void
    updateLastState(isAvailable: boolean, config: BotConfigType): void
}

export class Pinger implements PingerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private messageGenerator: MessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
        private forecastGenerator: ForecastGeneratorInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    private isStateChanged(isAvailable: boolean, id: number): boolean {
        const lastState = this.userProperties.getProperty(STORAGE_KEY.LAST_STATE + id);

        if (lastState === null) {
            return true; // for first iteration send message to check is bot working
        }

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
                this.telegramService.sendMessages(forecastMessage, options.config.TELEGRAM_CHATS);
                this.userProperties.setProperty(key.isForecastSent, STORAGE_STATE.TRUE);
            }
        }

        if (!this.isStateChanged(isAvailable, options.config.ID)) {
            return;
        }

        const lastTime = this.userProperties.getProperty(key.lastTime) || '0';
        const message = this.messageGenerator.generate({isAvailable, lastTime, pingOptions: options});

        if (options.config.TITLE !== undefined) {
            const title = isAvailable ? options.config.TITLE.AVAILABLE : options.config.TITLE.UNAVAILABLE;
            this.telegramService.setChatsTitle({title}, options.config.TELEGRAM_CHATS);
        }

        this.telegramService.sendMessages(message, options.config.TELEGRAM_CHATS);

        this.userProperties.setProperties({
            [key.lastTime]: String(options.nowDate.getTime()),
            [key.isForecastSent]: STORAGE_STATE.FALSE,
        });
    }

    updateLastState(isAvailable: boolean, config: BotConfigType): void {
        this.userProperties.setProperty(
            STORAGE_KEY.LAST_STATE + config.ID,
            isAvailable ? STORAGE_STATE.TRUE : STORAGE_STATE.FALSE,
        );
    }
}
