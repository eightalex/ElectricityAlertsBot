import {StatisticsType} from '../../../types/StatisticsType';
import {StatisticsBuilder, StatisticsBuilderInterface} from './StatisticsBuilder';

describe('StatisticsBuilder', () => {
    let statisticsBuilder: StatisticsBuilderInterface;

    beforeEach(() => {
        statisticsBuilder = new StatisticsBuilder();
    });

    describe('getDefault', () => {
        it('should return the default statistics object with the current date string and time object', () => {
            const expectedStatistics: StatisticsType = {
                date: '24/12/2022',
                time: {
                    available: 0,
                    notAvailable: 0,
                    previous: new Date().getTime(),
                },
            };

            const date = new Date('12/24/2022');
            const statistics = statisticsBuilder.getDefault(date);

            expect(statistics).toEqual(expectedStatistics);
        });
    });
});
