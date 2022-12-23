import {STORAGE_KEY} from '../../constants/storageKey';
import {StatisticsMessageGeneratorInterface} from './StatisticsMessageGenerator';
import {TelegramServiceInterface} from '../TelegramService';

export interface StatisticsInformerInterface {
    inform(): void
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

    inform() {
        const statisticsRaw = this.userProperties.getProperty(STORAGE_KEY.STATISTICS);

        if (statisticsRaw === null) {
            return;
        }

        const statistics = JSON.parse(statisticsRaw);
        const message = this.statisticsMessageGenerator.generate(statistics);

        this.telegramService.sendMessage(message, {silent: true});
    }
}
