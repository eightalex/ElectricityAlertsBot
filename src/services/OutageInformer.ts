import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';
import {BotConfigType} from '../../types/BotConfigType';
import {StringHelper} from '../utils/StringHelper';
import {PLURAL_CONFIG} from '../constants/pluralConfig';
import {ConcreteInformerInterface} from './Informer';

export class OutageInformer implements ConcreteInformerInterface {
    constructor(
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
    ) {}

    inform(config: BotConfigType): void {
        if (config.FUTURE_OUTAGE === undefined || config.REGION === undefined || config.GROUP === undefined) {
            throw new Error('OutageInformer: Undefined config');
        }

        const outages = this.yasno.checkFutureOutage({
            region: config.REGION,
            group: config.GROUP,
            minutes: config.FUTURE_OUTAGE.MINUTES,
        });

        if (!outages) {
            return;
        }

        const minutesLeft = 60 - config.FUTURE_OUTAGE.MINUTES;
        const minutesText = StringHelper.pluralize(minutesLeft, PLURAL_CONFIG.MINUTES);

        const message = `🚧 Через ${minutesLeft} ${minutesText} можливе відключення`;

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
