import {StatisticsPeriod, StatisticsType} from '../../../types/StatisticsType';

export interface StatisticsBuilderInterface {
    build(options: BuildStatisticsOptions): StatisticsType
}

export type BuildStatisticsOptions = {
    period: StatisticsPeriod
    start: Date
    end: Date
    downtimeMs: number
    incidents: number
}

export class StatisticsBuilder implements StatisticsBuilderInterface {
    build({period, start, end, downtimeMs, incidents}: BuildStatisticsOptions): StatisticsType {
        const windowMs = Math.max(0, end.getTime() - start.getTime());
        const notAvailable = Math.min(windowMs, Math.max(0, downtimeMs));
        const available = Math.max(0, windowMs - notAvailable);

        return {
            period,
            start: start.getTime(),
            end: end.getTime(),
            incidents,
            time: {
                available,
                notAvailable,
            },
        };
    }
}
