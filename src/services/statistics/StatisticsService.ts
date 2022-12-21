import {StatisticsType} from '../../../types/StatisticsType';
import {STORAGE_KEY} from '../../constants/storageKey';
import {StatisticsBuilderInterface} from './StatisticsBuilder';
import {DateHelperInterface} from '../../utils/DateHelper';
import {MonitorsStatusCheckerInterface} from '../monitors/MonitorsStatusChecker';

export interface StatisticsServiceInterface {
    prepare(statisticsRaw: string): StatisticsType
    prepareToStore(statistics: StatisticsType): string
    store(statistics: StatisticsType): void
    reset(): void
    update(): void
}

export class StatisticsService implements StatisticsServiceInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private monitorsStatusChecker: MonitorsStatusCheckerInterface,
        private statisticsBuilder: StatisticsBuilderInterface,
        private dateHelper: DateHelperInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    prepare(statisticsRaw: string): StatisticsType {
        try {
            return JSON.parse(statisticsRaw);
        } catch (e) {
            throw new Error(e);
        }
    }

    prepareToStore(statistics: StatisticsType): string {
        try {
            return JSON.stringify(statistics);
        } catch (e) {
            throw new Error(e);
        }
    }

    store(statistics: StatisticsType) {
        const statisticsPrepared = this.prepareToStore(statistics);
        this.userProperties.setProperty(STORAGE_KEY.STATISTICS, statisticsPrepared);
    }

    reset() {
        this.store(this.statisticsBuilder.getDefault(new Date()));
    }

    update(): void {
        const nowDate = new Date();
        const isAvailable = this.monitorsStatusChecker.check();
        const statisticsRaw = this.userProperties.getProperty(STORAGE_KEY.STATISTICS);
        const availability = isAvailable ? 'available' : 'notAvailable';

        let statistics = statisticsRaw === null
            ? this.statisticsBuilder.getDefault(nowDate)
            : this.prepare(statisticsRaw);

        if (statistics.date !== this.dateHelper.getDateString(nowDate)) {
            statistics = this.statisticsBuilder.getDefault(nowDate);
        }

        const difference = this.dateHelper.getDifference(new Date(statistics.time.previous), nowDate);

        statistics.time[availability] += difference;
        statistics.time.previous = nowDate.getTime();

        this.store(statistics);
    }
}
