import {STORAGE_KEY} from '../constants/storageKey';
import {BotConfigType} from '../../types/BotConfigType';
import {DateHelper} from '../utils/DateHelper';
import {TIME} from '../constants/time';

type InfoType = 'STATISTICS';

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

export interface ConcreteInformerInterface {
    inform(config: BotConfigType): void
}

export interface InformerInterface {
    inform(type: InfoType, options: InformOptions): void
}

export class Informer implements InformerInterface {
    private readonly userProperties = PropertiesService.getUserProperties();

    private informers: Record<InfoType, {
        INSTANCE: ConcreteInformerInterface
        STORAGE_KEY: keyof typeof STORAGE_KEY
        FREQUENCY: number
    }>;

    constructor(
        statisticsInformer: ConcreteInformerInterface,
    ) {
        this.informers = {
            STATISTICS: {
                INSTANCE: statisticsInformer,
                STORAGE_KEY: 'STATISTICS_INFORMED_DATE',
                FREQUENCY: TIME.DAY,
            },
        };
    }

    inform(type: InfoType, options: InformOptions) {
        const key = this.informers[type].STORAGE_KEY;
        const storageKey = STORAGE_KEY[key] + options.config.ID;

        this.informWithFrequency({type, storageKey, options, frequency: this.informers[type].FREQUENCY});
    }

    reset(type: InfoType, id: number) {
        const key = this.informers[type].STORAGE_KEY;
        const storageKey = STORAGE_KEY[key] + id;

        this.userProperties.deleteProperty(storageKey);
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
