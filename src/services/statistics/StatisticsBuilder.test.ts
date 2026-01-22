import {StatisticsBuilder, StatisticsBuilderInterface} from './StatisticsBuilder';

describe('StatisticsBuilder', () => {
    let statisticsBuilder: StatisticsBuilderInterface;

    beforeEach(() => {
        statisticsBuilder = new StatisticsBuilder();
    });

    describe('build', () => {
        it('should build statistics for a day period', () => {
            const start = new Date('2024-01-01T00:00:00.000Z');
            const end = new Date('2024-01-01T23:59:59.999Z');
            const downtimeMs = 1000 * 60 * 60;
            const incidents = 2;

            const statistics = statisticsBuilder.build({
                period: 'day',
                start,
                end,
                downtimeMs,
                incidents,
            });

            const windowMs = end.getTime() - start.getTime();

            expect(statistics).toEqual({
                period: 'day',
                start: start.getTime(),
                end: end.getTime(),
                incidents,
                time: {
                    available: windowMs - downtimeMs,
                    notAvailable: downtimeMs,
                },
            });
        });
    });
});
