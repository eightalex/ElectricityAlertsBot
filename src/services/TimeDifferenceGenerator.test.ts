import {TimeDifferenceGenerator, TimeDifferenceGeneratorInterface} from './TimeDifferenceGenerator';

describe('TimeDifferenceGenerator', () => {
    let timeDifferenceGenerator: TimeDifferenceGeneratorInterface;

    beforeEach(() => {
        timeDifferenceGenerator = new TimeDifferenceGenerator();
    });

    describe('generate', () => {
        it('should generate the time difference between the last time and the current time', () => {
            const lastTime = '1640998861000';
            const nowDate = new Date('2022-01-02T02:05:01.000Z');
            const expectedTimeDifference = '25 годин 4 хвилини';
            const timeDifference = timeDifferenceGenerator.generate(lastTime, nowDate);

            expect(timeDifference).toEqual(expectedTimeDifference);
        });
    });
});
