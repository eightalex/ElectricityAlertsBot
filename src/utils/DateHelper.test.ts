import {TIME} from '../constants/time';
import {DateHelper, TimeStringNumbers} from './DateHelper';
import {StringHelper} from './StringHelper';

describe('DateHelper', () => {
    let dateHelper: DateHelper;

    beforeEach(() => {
        dateHelper = new DateHelper(new StringHelper());
    });

    describe('getDifference', () => {
        it('should return the difference in milliseconds between two dates', () => {
            const dateFirst = new Date('2022-01-01T00:00:00.000Z');
            const dateSecond = new Date('2022-01-01T00:01:00.000Z');
            const expectedDifference = TIME.MINUTE;

            const difference = dateHelper.getDifference(dateFirst, dateSecond);

            expect(difference).toEqual(expectedDifference);
        });
    });

    describe('getTimeString', () => {
        it('should return the time in the format "HH:MM"', () => {
            const date = new Date('2022-01-01T00:00:00.000Z');
            const expectedTimeString = '02:00'; // +2 time zone

            const timeString = dateHelper.getTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });

        it('should return the time in the format "HH:MM"', () => {
            const date = new Date('2022-01-01T01:01:00.000Z');
            const expectedTimeString = '03:01'; // +2 time zone

            const timeString = dateHelper.getTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });

        it('should return the time in the format "HH:MM"', () => {
            const date = new Date('2022-01-01T23:59:41.000Z');
            const expectedTimeString = '01:59'; // +2 time zone

            const timeString = dateHelper.getTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });
    });

    describe('getDateString', () => {
        it('should return the date in the format "DD/MM/YYYY"', () => {
            const date = new Date('2022-01-01T00:01:00.000Z');
            const expectedDateString = '1/1/2022';

            const dateString = dateHelper.getDateString(date);

            expect(dateString).toEqual(expectedDateString);
        });
    });

    describe('getTimeFromTimeString', () => {
        it('should return object of hours and minutes', () => {
            const timeString = '08:00';
            const expectedObject: TimeStringNumbers = {
                hours: 8,
                minutes: 0,
            };

            const time = dateHelper.getTimeFromTimeString(timeString);

            expect(time).toEqual(expectedObject);
        });
    });

    describe('getPluralizedTimeString', () => {
        it('should return the time only in minutes, with correct pluralization', () => {
            const timeDifference = 869869;
            const date = new Date(timeDifference);
            const expectedTimeString = '14 хвилин';

            const timeString = dateHelper.getPluralizedTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });

        it('should return the time only in minutes, with correct pluralization', () => {
            const timeDifference = 227533;
            const date = new Date(timeDifference);
            const expectedTimeString = '3 хвилини';

            const timeString = dateHelper.getPluralizedTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });

        it('should return the time in hours and minutes, with correct pluralization', () => {
            const timeDifference = 6825990;
            const date = new Date(timeDifference);
            const expectedTimeString = '1 годину 53 хвилини';

            const timeString = dateHelper.getPluralizedTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });

        it('should return the time in hours and minutes, with correct pluralization', () => {
            const timeDifference = 648469050;
            const date = new Date(timeDifference);
            const expectedTimeString = '180 годин 7 хвилин';

            const timeString = dateHelper.getPluralizedTimeString(date);

            expect(timeString).toEqual(expectedTimeString);
        });
    });

    describe('parseIcsDate', () => {
        it('should return correctly parsed ics date', () => {
            const icsString = '20221227T110000Z';
            const expectedDate = new Date('2022-12-27T11:00:00Z');

            const date = dateHelper.parseIcsDate(icsString);

            expect(date).toEqual(expectedDate);
        });
    });
});
