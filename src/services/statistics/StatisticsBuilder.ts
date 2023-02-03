import {StatisticsType} from '../../../types/StatisticsType';
import {DateHelper} from '../../utils/DateHelper';

export interface StatisticsBuilderInterface {
    getDefault(date: Date): StatisticsType
}

export class StatisticsBuilder implements StatisticsBuilderInterface {
    getDefault(date: Date): StatisticsType {
        return {
            date: DateHelper.getDateString(date),
            time: {
                available: 0,
                notAvailable: 0,
                previous: new Date().getTime(),
            },
        };
    }
}
