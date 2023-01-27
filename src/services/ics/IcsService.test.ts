import {IcsService, IcsServiceInterface} from './IcsService';
import {DateHelper} from '../../utils/DateHelper';
import {StringHelper} from '../../utils/StringHelper';
import {exampleIcs, parsedIcs} from './testData/exampleIcs';
import {CalendarEvent} from '../../../types/CalendarEvent';

export const filteredEvents: CalendarEvent[] = [
    {
        start: new Date('2023-01-03 07:00 Z'),
        end: new Date('2023-01-03 11:00 Z'),
    },
    {
        start: new Date('2023-01-03 16:00 Z'),
        end: new Date('2023-01-03 20:00 Z'),
    },
    {
        start: new Date('2023-01-04 01:00 Z'),
        end: new Date('2023-01-04 05:00 Z'),
    },
    {
        start: new Date('2023-01-04 10:00 Z'),
        end: new Date('2023-01-04 14:00 Z'),
    },
    {
        start: new Date('2023-01-04 19:00 Z'),
        end: new Date('2023-01-04 22:00 Z'),
    },
];

describe('IcsService', () => {
    let icsService: IcsServiceInterface;

    beforeEach(() => {
        icsService = new IcsService(new DateHelper(new StringHelper));
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2023-01-03 08:00 Z'));
    });

    describe('parse', () => {
        it('should return an empty array if no events are found in the ics string', () => {
            const ics = 'BEGIN:VCALENDAR\nEND:VCALENDAR';
            const events = icsService.parse(ics);

            expect(events).toEqual([]);
        });

        it('should return an array of events from ics string', () => {
            const events = icsService.parse(exampleIcs);

            expect(events).toEqual(parsedIcs);
        });
    });

    describe('getEvents', () => {
        it('should return events from SCHEDULE_INFORM_TIME to tomorrow', () => {
            const todayEvents = icsService.getEvents(parsedIcs, '08:00');

            expect(todayEvents).toEqual(filteredEvents);
        });
    });
});
