import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';
import {OutageInformerInterface} from './OutageInformer';

export type InfoTypes = 'STATISTICS' | 'SCHEDULE' | 'FUTURE_OUTAGE';

type InformOptions = {
    config: BotConfigType
    timeString: string
}

export interface InformerInterface {
    inform(type: InfoTypes, options: InformOptions): void
    reset(timeString: string, id: number): void
}

export class Informer implements InformerInterface {
    private readonly userProperties = PropertiesService.getUserProperties();

    constructor(
        private statisticsInformer: StatisticsInformerInterface,
        private scheduleInformer: ScheduleInformerInterface,
        private outageInformer: OutageInformerInterface,
    ) {}

    inform(type: InfoTypes, options: InformOptions) {
        // @ts-ignore
        let storageKey = STORAGE_KEY[type + '_INFORMED_DATE'] + options.config.ID;

        if (!options.config[type]) {
            throw new Error('Informer: Undefined config')
        }

        /**
         * Prevent multiple notifications
         */
        if (options.timeString === this.userProperties.getProperty(storageKey)) {
            return;
        }

        switch (type) {
            case 'STATISTICS':
                this.statisticsInformer.inform(options.config);
                break;
            case 'SCHEDULE':
                this.scheduleInformer.inform(options.config);
                break;
            case 'FUTURE_OUTAGE':
                this.outageInformer.inform(options.config);
                break;
        }

        this.userProperties.setProperty(storageKey, options.timeString);
    }

    reset(timeString: string, id: number) {
        const isInformedSchedule = this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE + id);
        const isInformedStatistics = this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE + id);
        const isInformedOutage = this.userProperties.getProperty(STORAGE_KEY.OUTAGE_INFORMED_DATE + id);

        if (isInformedSchedule !== timeString || isInformedStatistics !== timeString || isInformedOutage !== timeString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.SCHEDULE_INFORMED_DATE + id]: '',
                [STORAGE_KEY.STATISTICS_INFORMED_DATE + id]: '',
                [STORAGE_KEY.OUTAGE_INFORMED_DATE + id]: '',
            });
        }
    }
}
