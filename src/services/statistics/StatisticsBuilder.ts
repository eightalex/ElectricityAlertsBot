import {StatisticsType} from '../../../types/StatisticsType';
import {DateHelperInterface} from '../../utils/DateHelper';

export interface StatisticsBuilderInterface {
    getDefault(date: Date): StatisticsType
}

export class StatisticsBuilder implements StatisticsBuilderInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    getDefault(date: Date): StatisticsType {
        return {
            date: this.dateHelper.getDateString(date),
            time: {
                available: 0,
                notAvailable: 0,
                previous: new Date().getTime(),
            },
        };
    }
}
