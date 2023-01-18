import {APP} from '../constants/app';
import {IcsFetcherInterface} from './ics/IcsFetcher';
import {IcsServiceInterface} from './ics/IcsService';
import {ScheduleGeneratorInterface} from './ScheduleGenerator';
import {MessageSenderInterface} from './message/MessageSender';

export interface ScheduleInformerInterface {
    inform(): void
}

export class ScheduleInformer implements ScheduleInformerInterface {
    constructor(
        private icsFetcher: IcsFetcherInterface,
        private icsService: IcsServiceInterface,
        private scheduleGenerator: ScheduleGeneratorInterface,
        private messageSender: MessageSenderInterface,
    ) {}

    inform() {
        const ics = this.icsFetcher.fetch();
        const events = this.icsService.parse(ics);
        const filteredEvents = this.icsService.getEvents(events);
        const message = this.scheduleGenerator.generate(filteredEvents);

        this.messageSender.send(message, APP.TELEGRAM.MESSAGE_CONFIG);
    }
}
