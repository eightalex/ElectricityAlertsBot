import {STRING} from '../../constants/string';
import {DateHelperInterface} from '../../utils/DateHelper';
import {StatisticsType} from '../../../types/StatisticsType';

export interface StatisticsMessageGeneratorInterface {
    generate(statisticsRaw: StatisticsType): string
}

export class StatisticsMessageGenerator implements StatisticsMessageGeneratorInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    generate(statistics: StatisticsType): string {
        const {NEWLINE} = STRING;
        const {available, notAvailable} = statistics.time;
        const {shortest: shortestA, longest: longestA} = statistics.state.available;
        const {shortest: shortestNA, longest: longestNA} = statistics.state.notAvailable;

        const time = {
            available: this.dateHelper.getPluralizedTimeString(new Date(available)),
            notAvailable: this.dateHelper.getPluralizedTimeString(new Date(notAvailable)),
            shortestA: this.dateHelper.getPluralizedTimeString(new Date(shortestA)),
            shortestNA: this.dateHelper.getPluralizedTimeString(new Date(shortestNA)),
            longestA: this.dateHelper.getPluralizedTimeString(new Date(longestA)),
            longestNA: this.dateHelper.getPluralizedTimeString(new Date(longestNA)),
        };

        return [
            '💡Статистика за сьогодні',

            [
                'Світло загалом було наявне',
                time.available,
            ].join(NEWLINE),

            [
                'Та відсутнє',
                time.notAvailable,
            ].join(NEWLINE),

            // [
            //     'Найдовше включення тривало',
            //     time.longestA,
            // ].join(NEWLINE),
            //
            // [
            //     'Найкоротше включення',
            //     time.shortestA,
            // ].join(NEWLINE),
            //
            // [
            //     'Найдовше відключення тривало',
            //     time.longestNA,
            // ].join(NEWLINE),
            //
            // [
            //     'Найкоротше відключення',
            //     time.longestNA,
            // ].join(NEWLINE),
        ].join(STRING.PARAGRAPH);
    }
}
