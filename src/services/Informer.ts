import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';

type InformOptions = {
    config: BotConfigType
    timeString: string
    dateString: string
}

export interface InformerInterface {
    inform(type: 'STATISTICS' | 'SCHEDULE', options: InformOptions): void
    reset(dateString: string, id: number): void
}

export class Informer implements InformerInterface {
    private readonly userProperties = PropertiesService.getUserProperties();

    constructor(
        private statisticsInformer: StatisticsInformerInterface,
        private scheduleInformer: ScheduleInformerInterface,
    ) {}

    inform(type: 'STATISTICS' | 'SCHEDULE', options: InformOptions) {
        // @ts-ignore
        let storageKey = STORAGE_KEY[type + '_INFORMED_DATE'] + options.config.ID;

        if (options.dateString === this.userProperties.getProperty(storageKey)) {
            return;
        }

        if (options.timeString !== options.config[type].INFORM_TIME) {
            return;
        }

        switch (type) {
            case 'STATISTICS':
                this.statisticsInformer.inform(options.config);
                break;
            case 'SCHEDULE':
                this.scheduleInformer.inform(options.config);
                break;
        }

        this.userProperties.setProperty(storageKey, options.dateString);
    }

    reset(dateString: string, id: number) {
        const isInformedSchedule = this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE + id);
        const isInformedStatistics = this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE + id);

        if (isInformedSchedule !== dateString || isInformedStatistics !== dateString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.SCHEDULE_INFORMED_DATE + id]: '',
                [STORAGE_KEY.STATISTICS_INFORMED_DATE + id]: '',
            });
        }
    }
}
