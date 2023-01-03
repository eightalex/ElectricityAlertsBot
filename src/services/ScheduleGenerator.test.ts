import {CalendarEvent} from '../../types/CalendarEvent';
import {ScheduleGenerator} from './ScheduleGenerator';
import {DateHelper} from '../utils/DateHelper';
import {StringHelper} from '../utils/StringHelper';
import {filteredEvents} from './ics/IcsService.test';

const expectedSchedule =
`🗓️ Відключення сьогодні

09:00 – 13:00
18:00 – 22:00

Та завтра
03:00 – 07:00
12:00 – 16:00
21:00 – 00:00

(За графіком від ДТЕК)`;

describe('ScheduleGenerator', () => {
    let scheduleGenerator: ScheduleGenerator;

    beforeEach(() => {
        scheduleGenerator = new ScheduleGenerator(new DateHelper(new StringHelper()));
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2023-01-03 08:00 Z'));
    });

    describe('generate', () => {
        it('should return a string with a list of events formatted as time ranges', () => {
            const schedule = scheduleGenerator.generate(filteredEvents);
            expect(schedule).toEqual(expectedSchedule);
        });

        it('should return an empty string if there are no events', () => {
            const events: CalendarEvent[] = [];
            const schedule = scheduleGenerator.generate(events);

            expect(schedule).toEqual('');
        });
    });
});