import {IcsFetcherInterface} from './ics/IcsFetcher';
import {IcsServiceInterface} from './ics/IcsService';
import {ScheduleGeneratorInterface} from './ScheduleGenerator';
import {BotConfigType} from '../../types/BotConfigType';
import {TelegramServiceInterface} from './TelegramService';

export interface ScheduleInformerInterface {
    inform(config: BotConfigType): void
}

export class ScheduleInformer implements ScheduleInformerInterface {
    constructor(
        private icsFetcher: IcsFetcherInterface,
        private icsService: IcsServiceInterface,
        private scheduleGenerator: ScheduleGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.SCHEDULE === undefined) {
            return;
        }

        const ics = this.icsFetcher.fetch(config.SCHEDULE.CALENDAR_URL);
        const filteredEvents = this.icsService.getFilteredEvents(ics, config.SCHEDULE.INFORM_TIME);
        const message = this.scheduleGenerator.generate(filteredEvents);

        this.telegramService.sendMessages(message, config.TELEGRAM_CHATS);
    }
}
