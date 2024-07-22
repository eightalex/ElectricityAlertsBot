import {ScheduleGeneratorInterface} from './message/ScheduleGenerator';
import {BotConfigType} from '../../types/BotConfigType';
import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';
import {ConcreteInformerInterface} from './Informer';

export class ScheduleInformer implements ConcreteInformerInterface {
    constructor(
        private scheduleGenerator: ScheduleGeneratorInterface,
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.REGION === undefined || config.GROUP === undefined) {
            throw new Error('ScheduleInformer: Undefined config');
        }

        const date = new Date();
        /**
         * We receive 1 for Monday, 2 for Tuesday, etc. And 0 for Sunday
         * It's correct, because we need to get the schedule for the next day
         */
        const dayOfWeek = date.getDay();
        const schedule = this.yasno.getSchedule({
            region: config.REGION,
            group: config.GROUP,
            day: dayOfWeek,
        });

        if (schedule === null) {
            return;
        }

        const message = this.scheduleGenerator.generate(schedule);

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
