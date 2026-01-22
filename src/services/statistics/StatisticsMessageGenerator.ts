import {STRING} from '../../constants/string';
import {DateHelper} from '../../utils/DateHelper';
import {StatisticsType} from '../../../types/StatisticsType';
import {DateHelper} from '../../utils/DateHelper';

export interface StatisticsMessageGeneratorInterface {
    generate(statisticsRaw: StatisticsType): string
}

export class StatisticsMessageGenerator implements StatisticsMessageGeneratorInterface {
    generate(statistics: StatisticsType): string {
        const {available, notAvailable} = statistics.time;
        const periodTitle = statistics.period === 'month' ? 'за місяць' : 'за сьогодні';

        if (available === 0) {
            return `🕯Статистика ${periodTitle}\n\nСвітло було відсутнє весь період`;
        }

        if (notAvailable === 0) {
            return `💡Статистика ${periodTitle}\n\nСвітло було наявне весь період`;
        }

        const time = {
            available: DateHelper.getPluralizedTimeString(new Date(available)),
            notAvailable: DateHelper.getPluralizedTimeString(new Date(notAvailable)),
        };

        const incidentsLine = `Кількість відключень: ${statistics.incidents}`;

        return [
            `💡Статистика ${periodTitle}`,

            [
                'Світло загалом було наявне',
                time.available,
            ].join(STRING.NEWLINE),

            [
                'Та відсутнє',
                time.notAvailable,
            ].join(STRING.NEWLINE),

            incidentsLine,
        ].join(STRING.PARAGRAPH);
    }
}
