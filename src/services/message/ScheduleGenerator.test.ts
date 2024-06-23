import {ScheduleGenerator} from './ScheduleGenerator';
import {Outage} from '../../../types/YasnoType';

describe('ScheduleGenerator', () => {
    let scheduleGenerator: ScheduleGenerator;

    beforeEach(() => {
        scheduleGenerator = new ScheduleGenerator();
    });

    it('should return a formatted string for a given schedule', () => {
        const schedule: Outage[] = [
            { start: 3, end: 7, type: 'DEFINITE_OUTAGE' },
            { start: 12, end: 16, type: 'DEFINITE_OUTAGE' },
            { start: 21, end: 1, type: 'DEFINITE_OUTAGE' },
        ];
        const expected = '🗓️ Можливі відключення завтра:\n\n03:00 – 07:00\n12:00 – 16:00\n21:00 – 01:00';
        const result = scheduleGenerator.generate(schedule);
        expect(result).toEqual(expected);
    });

    it('should ignore non-definite outages', () => {
        const schedule: Outage[] = [
            { start: 3, end: 7, type: 'POSSIBLE_OUTAGE' },
            { start: 12, end: 16, type: 'DEFINITE_OUTAGE' },
        ];
        const expected = '🗓️ Можливі відключення завтра:\n\n12:00 – 16:00';
        const result = scheduleGenerator.generate(schedule);
        expect(result).toEqual(expected);
    });

    it('should return an empty string for an empty schedule', () => {
        const schedule: Outage[] = [];
        const expected = '🗓️ На завтра відключень не передбачено';
        const result = scheduleGenerator.generate(schedule);
        expect(result).toEqual(expected);
    });
});
