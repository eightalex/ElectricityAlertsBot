import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';
import {BotConfigType} from '../../types/BotConfigType';

export interface OutageInformerInterface {
    inform(config: BotConfigType): void
}

export class OutageInformer implements OutageInformerInterface {
    constructor(
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
    ) {}

    inform(config: BotConfigType): void {
        if (config.FUTURE_OUTAGE === undefined) {
            return;
        }

        const outages = this.yasno.checkFutureOutage({
            region: config.FUTURE_OUTAGE.REGION,
            group: config.FUTURE_OUTAGE.GROUP,
            minutes: config.FUTURE_OUTAGE.MINUTES,
        });

        if (!outages) {
            return;
        }

        const message = `🚧 Через ${config.FUTURE_OUTAGE.MINUTES} хвилин можливе відключення`;

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}