import {STRING} from '../../constants/string';
import {DateHelper} from '../../utils/DateHelper';
import {StatisticsType} from '../../../types/StatisticsType';

export interface StatisticsMessageGeneratorInterface {
    generate(statisticsRaw: StatisticsType): string
}

export class StatisticsMessageGenerator implements StatisticsMessageGeneratorInterface {
    generate(statistics: StatisticsType): string {
        const {available, notAvailable} = statistics.time;

        if (available === 0) {
            return '🕯Сьогодні світло було відсутнє цілий день';
        }

        if (notAvailable === 0) {
            return '💡Сьогодні світло було наявне цілий день';
        }

        const time = {
            available: DateHelper.getPluralizedTimeString(new Date(available)),
            notAvailable: DateHelper.getPluralizedTimeString(new Date(notAvailable)),
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
