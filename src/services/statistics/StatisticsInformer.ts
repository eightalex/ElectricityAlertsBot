import {STORAGE_KEY} from '../../constants/storageKey';
import {StatisticsMessageGeneratorInterface} from './StatisticsMessageGenerator';
import {BotConfigType} from '../../../types/BotConfigType';
import {TelegramServiceInterface} from '../TelegramService';

export interface StatisticsInformerInterface {
    inform(config: BotConfigType): void
}

export class StatisticsInformer implements StatisticsInformerInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private statisticsMessageGenerator: StatisticsMessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    inform(config: BotConfigType) {
        const statisticsRaw = this.userProperties.getProperty(STORAGE_KEY.STATISTICS + config.ID);

        if (statisticsRaw === null) {
            return;
        }

        const statistics = JSON.parse(statisticsRaw);
        const message = this.statisticsMessageGenerator.generate(statistics);

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
