import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';
import {OutageInformerInterface} from './OutageInformer';

export type InfoType = 'STATISTICS' | 'SCHEDULE' | 'FUTURE_OUTAGE';

type timeOptions = {
    timeString: string
    dateString: string
}

type InformOptions = timeOptions & {
    config: BotConfigType
}

type ResetOptions = timeOptions & {
    id: number
}

export interface InformerInterface {
    inform(type: InfoType, options: InformOptions): void
    reset(options: ResetOptions): void
}

export class Informer implements InformerInterface {
    private readonly userProperties = PropertiesService.getUserProperties();

    constructor(
        private statisticsInformer: StatisticsInformerInterface,
        private scheduleInformer: ScheduleInformerInterface,
        private outageInformer: OutageInformerInterface,
    ) {}

    inform(type: InfoType, options: InformOptions) {
        // @ts-ignore
        let storageKey = STORAGE_KEY[type + '_INFORMED_DATE'] + options.config.ID;

        if (!options.config[type]) {
            throw new Error('Informer: Undefined config')
        }

        this.informDaily(type, storageKey, options);
        this.informPerMinute(type, storageKey, options);
    }

    informDaily(type: InfoType, storageKey: string, options: InformOptions) {
        if (options.dateString === this.userProperties.getProperty(storageKey)) {
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

    informPerMinute(type: InfoType, storageKey: string, options: InformOptions) {
        if (options.timeString === this.userProperties.getProperty(storageKey)) {
            return;
        }

        switch (type) {
            case 'FUTURE_OUTAGE':
                this.outageInformer.inform(options.config);
                break;
        }

        this.userProperties.setProperty(storageKey, options.timeString);
    }

    reset({id, timeString, dateString}: ResetOptions) {
        const isInformedSchedule = this.userProperties.getProperty(STORAGE_KEY.SCHEDULE_INFORMED_DATE + id);
        const isInformedStatistics = this.userProperties.getProperty(STORAGE_KEY.STATISTICS_INFORMED_DATE + id);
        const isInformedOutage = this.userProperties.getProperty(STORAGE_KEY.OUTAGE_INFORMED_DATE + id);

        /**
         * Reset notifications which will be sent one time per day
         */
        if (isInformedSchedule !== dateString || isInformedStatistics !== dateString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.SCHEDULE_INFORMED_DATE + id]: '',
                [STORAGE_KEY.STATISTICS_INFORMED_DATE + id]: '',
            });
        }

        /**
         * Reset notifications which will be sent one time per minute
         */
        if (isInformedOutage !== timeString) {
            this.userProperties.setProperties({
                [STORAGE_KEY.OUTAGE_INFORMED_DATE + id]: '',
            });
        }
    }
}
