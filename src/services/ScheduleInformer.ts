import {IcsFetcherInterface} from './ics/IcsFetcher';
import {IcsServiceInterface} from './ics/IcsService';
import {ScheduleGeneratorInterface} from './ScheduleGenerator';
import {MessageSenderInterface} from './message/MessageSender';
import {BotConfigType} from '../../types/BotConfigType';

export interface ScheduleInformerInterface {
    inform(config: BotConfigType): void
}

export class ScheduleInformer implements ScheduleInformerInterface {
    constructor(
        private icsFetcher: IcsFetcherInterface,
        private icsService: IcsServiceInterface,
        private scheduleGenerator: ScheduleGeneratorInterface,
        private messageSender: MessageSenderInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.SCHEDULE.CALENDAR_URL === undefined || config.SCHEDULE.INFORM_TIME === undefined) {
            return;
        }

        const ics = this.icsFetcher.fetch(config.SCHEDULE.CALENDAR_URL);
        const filteredEvents = this.icsService.getFilteredEvents(ics, config.SCHEDULE.INFORM_TIME);
        const message = this.scheduleGenerator.generate(filteredEvents);

        this.messageSender.send(message, config.TELEGRAM_CHATS);
    }
}
