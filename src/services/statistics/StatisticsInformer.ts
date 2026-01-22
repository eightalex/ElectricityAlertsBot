import {StatisticsMessageGeneratorInterface} from './StatisticsMessageGenerator';
import {BotConfigType} from '../../../types/BotConfigType';
import {TelegramServiceInterface} from '../TelegramService';
import {ConcreteInformerInterface} from '../Informer';
import {StatisticsServiceInterface} from './StatisticsService';

export class StatisticsInformer implements ConcreteInformerInterface {
    constructor(
        private statisticsMessageGenerator: StatisticsMessageGeneratorInterface,
        private telegramService: TelegramServiceInterface,
        private statisticsService: StatisticsServiceInterface,
    ) {
    }

    inform(config: BotConfigType) {
        const statistics = this.statisticsService.build({
            config,
            nowDate: new Date(),
            period: 'day',
        });
        const message = this.statisticsMessageGenerator.generate(statistics);

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
