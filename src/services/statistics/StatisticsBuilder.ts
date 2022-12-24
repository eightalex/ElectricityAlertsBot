import {ELECTRICITY_STATE} from '../../constants/electricityState';
import {StatisticsStateType, StatisticsType} from '../../../types/StatisticsType';
import {DateHelperInterface} from '../../utils/DateHelper';

export interface StatisticsBuilderInterface {
    getDefault(date: Date): StatisticsType
    getDefaultState(): StatisticsStateType
}

export class StatisticsBuilder implements StatisticsBuilderInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    getDefault(date: Date): StatisticsType {
        return {
            date: this.dateHelper.getDateString(date),
            previousState: ELECTRICITY_STATE.AVAILABLE,
            state: {
                available: {
                    shortest: 0,
                    longest: 0,
                },
                notAvailable: {
                    shortest: 0,
                    longest: 0,
                },
            },
            time: {
                available: 0,
                notAvailable: 0,
                previous: new Date().getTime(),
            },
        };
    }

    getDefaultState(): StatisticsStateType {
        return {
            available: {
                shortest: 0,
                longest: 0,
            },
            notAvailable: {
                shortest: 0,
                longest: 0,
            },
        };
    }
}
