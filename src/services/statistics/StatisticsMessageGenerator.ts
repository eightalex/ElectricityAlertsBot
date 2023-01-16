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
        const {available, notAvailable} = statistics.time;

        const time = {
            available: this.dateHelper.getPluralizedTimeString(new Date(available)),
            notAvailable: this.dateHelper.getPluralizedTimeString(new Date(notAvailable)),
        };

        return [
            '💡Статистика за сьогодні',

            [
                'Світло загалом було наявне',
                time.available,
            ].join(STRING.NEWLINE),

            [
                'Та відсутнє',
                time.notAvailable,
            ].join(STRING.NEWLINE),
        ].join(STRING.PARAGRAPH);
    }
}
