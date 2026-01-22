export type StatisticsPeriod = 'day' | 'month';

export type StatisticsType = {
    period: StatisticsPeriod
    start: number
    end: number
    incidents: number
    time: {
        available: number
        notAvailable: number
    }
}
