import {TIME} from '../constants/time';
import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';
import {OutageInformerInterface} from './OutageInformer';
import {DateHelper} from '../utils/DateHelper';

type InfoType = 'STATISTICS' | 'SCHEDULE' | 'FUTURE_OUTAGE';

type InformOptions = {
    nowDate: Date
    config: BotConfigType
}

type isInformedOptions = {
    storageKey: string
    nowDate: Date
    minDifference: number
}

type informWithFrequencyOptions = {
    type: InfoType
    storageKey: string
    options: InformOptions
    frequency: number
}

export interface InformerInterface {
    inform(type: InfoType, options: InformOptions): void
}

export class Informer implements InformerInterface {
    private readonly userProperties = PropertiesService.getUserProperties();

    private informers: Record<InfoType, {
        INSTANCE: StatisticsInformerInterface | ScheduleInformerInterface | OutageInformerInterface
        STORAGE_KEY: keyof typeof STORAGE_KEY
        FREQUENCY: number
    }>;

    constructor(
        statisticsInformer: StatisticsInformerInterface,
        scheduleInformer: ScheduleInformerInterface,
        outageInformer: OutageInformerInterface,
    ) {
        this.informers = {
            STATISTICS: {
                INSTANCE: statisticsInformer,
                STORAGE_KEY: 'STATISTICS_INFORMED_DATE',
                FREQUENCY: TIME.DAY,
            },
            SCHEDULE: {
                INSTANCE: scheduleInformer,
                STORAGE_KEY: 'SCHEDULE_INFORMED_DATE',
                FREQUENCY: TIME.DAY,
            },
            FUTURE_OUTAGE: {
                INSTANCE: outageInformer,
                STORAGE_KEY: 'FUTURE_OUTAGE_INFORMED_DATE',
                FREQUENCY: TIME.MINUTE,
            },
        };
    }

    inform(type: InfoType, options: InformOptions) {
        const key = this.informers[type].STORAGE_KEY;
        const storageKey = STORAGE_KEY[key] + options.config.ID;

        if (!options.config[type]) {
            throw new Error('Informer: Undefined config');
        }

        this.informWithFrequency({type, storageKey, options, frequency: this.informers[type].FREQUENCY});
    }

    private informWithFrequency({type, storageKey, options, frequency}: informWithFrequencyOptions) {
        const isInformed = this.isInformed({
            storageKey,
            nowDate: options.nowDate,
            minDifference: frequency,
        });

        if (isInformed) {
            return;
        }

        this.informers[type].INSTANCE.inform(options.config);
        const timeStamp = options.nowDate.valueOf();
        this.userProperties.setProperty(storageKey, timeStamp.toString());
    }

    private isInformed({storageKey, nowDate, minDifference}: isInformedOptions): boolean {
        const previousTimestamp = this.userProperties.getProperty(storageKey);

        if (!previousTimestamp) {
            return false;
        }

        const preparedTimestamp = parseInt(previousTimestamp, 10);
        const previousDate = new Date(preparedTimestamp);
        const timeDifference = DateHelper.getDifference(nowDate, previousDate);

        return timeDifference < minDifference;
    }
}
