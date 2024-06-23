import {ScheduleGeneratorInterface} from './message/ScheduleGenerator';
import {BotConfigType} from '../../types/BotConfigType';
import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';

export interface ScheduleInformerInterface {
    inform(config: BotConfigType): void
}

export class ScheduleInformer implements ScheduleInformerInterface {
    constructor(
        private scheduleGenerator: ScheduleGeneratorInterface,
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.SCHEDULE === undefined) {
            return;
        }

        const date = new Date();
        /**
         * We receive 1 for Monday, 2 for Tuesday, etc. And 0 for Sunday
         * It's correct, because we need to get the schedule for the next da
         */
        const dayOfWeek = date.getDay();
        const schedule = this.yasno.getSchedule({
            region: config.SCHEDULE.REGION,
            group: config.SCHEDULE.GROUP,
            day: dayOfWeek,
        });

        if (schedule === null) {
            return;
        }

        const message = this.scheduleGenerator.generate(schedule);

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
