import {IcsFetcherInterface} from './ics/IcsFetcher';
import {IcsServiceInterface} from './ics/IcsService';
import {ScheduleGeneratorInterface} from './ScheduleGenerator';
import {TelegramServiceInterface} from './TelegramService';

export interface ScheduleInformerInterface {
    inform(): void
}

export class ScheduleInformer implements ScheduleInformerInterface {
    constructor(
        private icsFetcher: IcsFetcherInterface,
        private icsService: IcsServiceInterface,
        private scheduleGenerator: ScheduleGeneratorInterface,
        private telegramService: TelegramServiceInterface,
    ) {}

    inform() {
        const ics = this.icsFetcher.fetch();
        const events = this.icsService.parse(ics);
        const filteredEvents = this.icsService.getEvents(events);
        const message = this.scheduleGenerator.generate(filteredEvents);

        this.telegramService.sendMessage(message, {silent: true});
    }
}
