import {CalendarEvent} from '../../../types/CalendarEvent';
import {STRING} from '../../constants/string';
import {DateHelperInterface} from '../../utils/DateHelper';

export interface IcsServiceInterface {
    parse(ics: string): CalendarEvent[]
    getEvents(events: CalendarEvent[], informTime: string): CalendarEvent[]
}

export class IcsService implements IcsServiceInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    parse(ics: string): CalendarEvent[] {
        const lines = ics.split(STRING.NEWLINE);
        const events: CalendarEvent[] = [];
        let currentEvent: CalendarEvent | null = null;

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
            if (a.start.getDate() < b.start.getDate()) {
                return -1;
            }

            if (a.start.getDate() > b.start.getDate()) {
                return 1;
            }

            return 0;
        });

        return events;
    }

    getEvents(events: CalendarEvent[], informTime: string): CalendarEvent[] {
        const nowDate = new Date();
        const currentDate = nowDate.getDate();
        const nextDate = this.dateHelper.addDays(nowDate, 1).getDate();

        const time = this.dateHelper.getTimeFromTimeString(informTime);

        const presetTime = this.dateHelper.getUpdatedDate(
            nowDate,
            {
                hours: time.hours,
                minutes: time.minutes
            },
        ).getTime();

        const filteredEvents = events.filter(event => {
            return [currentDate, nextDate].includes(event.start.getDate());
        });

        for (let i = 0; i < filteredEvents.length - 1; i++) {
            const currentEvent = filteredEvents[i];
            const nextEvent = filteredEvents[i + 1];

            if (currentEvent === undefined || nextEvent === undefined) {
                continue;
            }

            if (currentEvent.end.getTime() === nextEvent.start.getTime()) {
                currentEvent.end = nextEvent.end;
                filteredEvents.splice(i + 1, 1);
                i--;
            }

            if (currentEvent.start.getDate() === currentDate && currentEvent.end.getTime() < presetTime) {
                filteredEvents.splice(i, 1);
                i--;
            }
        }

        return filteredEvents;
    }
}
