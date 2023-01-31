import {CalendarEventType} from '../../../types/CalendarEventType';
import {STRING} from '../../constants/string';
import {DateHelperInterface} from '../../utils/DateHelper';

export interface IcsServiceInterface {
    parse(ics: string): CalendarEventType[]
    getEvents(events: CalendarEventType[], informTime: string): CalendarEventType[]
    getFilteredEvents(ics: string, informTime: string): CalendarEventType[]
}

export class IcsService implements IcsServiceInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    parse(ics: string): CalendarEventType[] {
        const lines = ics.split(STRING.NEWLINE);
        const events: CalendarEventType[] = [];
        let currentEvent: CalendarEventType | null = null;

        for (const line of lines) {
            if (line.startsWith('BEGIN:VEVENT')) {
                currentEvent = {
                    start: new Date(),
                    end: new Date(),
                };
            }

            if (currentEvent === null) {
                continue;
            }

            if (line.startsWith('DTSTART:')) {
                currentEvent.start = this.dateHelper.parseIcsDate(line.substring(8));
            }

            if (line.startsWith('DTEND:')) {
                currentEvent.end = this.dateHelper.parseIcsDate(line.substring(6));
            }

            if (line.startsWith('END:VEVENT')) {
                events.push(currentEvent);
                currentEvent = null;
            }
        }

        events.sort((a, b) => {
            if (a.start.getTime() < b.start.getTime()) {
                return -1;
            }

            if (a.start.getTime() > b.start.getTime()) {
                return 1;
            }

            return 0;
        });

        return events;
    }

    getEvents(events: CalendarEventType[], informTime: string): CalendarEventType[] {
        const now = new Date();
        const currentDate = now.getDate();

        const time = this.dateHelper.getTimeFromTimeString(informTime);

        const presetTime = this.dateHelper.getUpdatedDate(
            now,
            {
                hours: time.hours,
                minutes: time.minutes
            },
        ).getTime();

        const filteredEvents = events.filter(event => {
            return [
                currentDate,
                this.dateHelper.addDays(now, 1).getDate(),
                this.dateHelper.addDays(now, 2).getDate(),
            ].includes(event.start.getDate());
        });

        for (let i = 0; i < filteredEvents.length - 1; i++) {
            const currentEvent = filteredEvents[i];
            const nextEvent = filteredEvents[i + 1];

            if (currentEvent === undefined || nextEvent === undefined) {
                continue;
            }

            if (currentEvent.start.getDate() === currentDate && currentEvent.end.getTime() < presetTime) {
                filteredEvents.splice(i, 1);
                i--;
            }

            if (currentEvent.end.getTime() === nextEvent.start.getTime()) {
                currentEvent.end = nextEvent.end;
                filteredEvents.splice(i + 1, 1);
                i--;
            }

            if (currentEvent.start.getDate() === this.dateHelper.addDays(now, 2).getDate()) {
                filteredEvents.splice(i);
            }
        }

        return filteredEvents;
    }

    getFilteredEvents(ics: string, informTime: string): CalendarEventType[] {
        const events: CalendarEventType[] = this.parse(ics);
        return this.getEvents(events, informTime);
    }
}
