import {StatisticsType} from '../../../types/StatisticsType';
import {STORAGE_KEY} from '../../constants/storageKey';
import {StatisticsBuilderInterface} from './StatisticsBuilder';
import {DateHelper} from '../../utils/DateHelper';
import {HouseConfigType} from '../../../types/MonitorsConfigType';

type UpdateOptions = {
    config: HouseConfigType
    nowDate: Date
}

export interface StatisticsServiceInterface {
    update(isAvailable: boolean, options: UpdateOptions): void
}

export class StatisticsService implements StatisticsServiceInterface {
    private readonly userProperties: GoogleAppsScript.Properties.Properties;

    constructor(
        propertiesService: GoogleAppsScript.Properties.PropertiesService,
        private statisticsBuilder: StatisticsBuilderInterface,
    ) {
        this.userProperties = propertiesService.getUserProperties();
    }

    private prepare(statisticsRaw: string): StatisticsType {
        try {
            return JSON.parse(statisticsRaw);
        } catch (e) {
            throw new Error(e);
        }
    }

    private prepareToStore(statistics: StatisticsType): string {
        try {
            return JSON.stringify(statistics);
        } catch (e) {
            throw new Error(e);
        }
    }

    private store(statistics: StatisticsType, id: number) {
        const statisticsPrepared = this.prepareToStore(statistics);
        this.userProperties.setProperty(STORAGE_KEY.STATISTICS + id, statisticsPrepared);
    }

    update(isAvailable: boolean, options: UpdateOptions) {
        const statisticsRaw = this.userProperties.getProperty(STORAGE_KEY.STATISTICS + options.config.ID);
        const availability = isAvailable ? 'available' : 'notAvailable';

        let statistics = statisticsRaw === null
            ? this.statisticsBuilder.getDefault(options.nowDate)
            : this.prepare(statisticsRaw);

        if (statistics.date !== DateHelper.getDateString(options.nowDate)) {
            statistics = this.statisticsBuilder.getDefault(options.nowDate);
        }

        const difference = DateHelper.getDifference(new Date(statistics.time.previous), options.nowDate);

        statistics.time[availability] += difference;
        statistics.time.previous = options.nowDate.getTime();

        this.store(statistics, options.config.ID);
    }
}
