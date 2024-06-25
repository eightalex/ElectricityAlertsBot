import {TIME} from '../constants/time';
import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';
import {OutageInformerInterface} from './OutageInformer';
import {DateHelper} from '../utils/DateHelper';

export type InfoType = 'STATISTICS' | 'SCHEDULE' | 'FUTURE_OUTAGE';

type InformOptions = {
    nowDate: Date
    config: BotConfigType
}

type isInformedOptions = {
    storageKey: string
    nowDate: Date
    minDifference: number
}

export interface InformerInterface {
    inform(type: InfoType, options: InformOptions): void
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
        const storageKey = STORAGE_KEY[type + '_INFORMED_DATE'] + options.config.ID;

        if (!options.config[type]) {
            throw new Error('Informer: Undefined config');
        }

        this.informWithFrequency(type, storageKey, options, TIME.DAY);
        this.informWithFrequency(type, storageKey, options, TIME.MINUTE);
    }

    private informWithFrequency(type: InfoType, storageKey: string, options: InformOptions, frequency: number) {
        const isInformed = this.isInformed({
            storageKey,
            nowDate: options.nowDate,
            minDifference: frequency,
        });

        if (isInformed) {
            return;
        }

        if (frequency === TIME.DAY) {
            switch (type) {
                case 'STATISTICS':
                    this.statisticsInformer.inform(options.config);
                    break;
                case 'SCHEDULE':
                    this.scheduleInformer.inform(options.config);
                    break;
            }
        }

        if (frequency === TIME.MINUTE) {
            switch (type) {
                case 'FUTURE_OUTAGE':
                    this.outageInformer.inform(options.config);
                    break;
            }
        }

        const timeStamp = options.nowDate.valueOf();
        this.userProperties.setProperty(storageKey, timeStamp.toString());
    }

    private isInformed({storageKey, nowDate, minDifference}: isInformedOptions): boolean {
        const previousTimestamp = this.userProperties.getProperty(storageKey);

        if (!previousTimestamp) {
            return false;
        }

        const previousDate = new Date(previousTimestamp);
        const timeDifference = DateHelper.getDifference(nowDate, previousDate);

        return timeDifference < minDifference;
    }
}
