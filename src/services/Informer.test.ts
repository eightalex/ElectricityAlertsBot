import {ConcreteInformerInterface, Informer} from './Informer';
import {BotConfigType} from '../../types/BotConfigType';
import {TIME} from '../constants/time';

const mockDate = new Date();

const defaultConfigOptions = {
    ID: 1,
    NAME: 'Test',
    TELEGRAM_CHATS: [{chat_id: '@chat'}],
};

const mockConfig: BotConfigType = {
    ...defaultConfigOptions,
    STATISTICS: {
        INFORM_TIME: '23:58',
    },
    SCHEDULE: {
        INFORM_TIME: '21:00',
    },
    FUTURE_OUTAGE: {
        MINUTES: 30,
    },
};

const PropertiesService = {
    getUserProperties: jest.fn().mockImplementation(() => ({
        getProperty: jest.fn().mockReturnValue(mockDate.valueOf().toString()),
        setProperty: jest.fn(),
    })),
};

(global as any).PropertiesService = PropertiesService;

describe('Informer', () => {
    let informer: Informer;
    let mockStatisticsInformer: jest.Mocked<ConcreteInformerInterface>;
    let mockScheduleInformer: jest.Mocked<ConcreteInformerInterface>;
    let mockOutageInformer: jest.Mocked<ConcreteInformerInterface>;

    beforeEach(() => {
        mockStatisticsInformer = {
            inform: jest.fn(),
        } as jest.Mocked<ConcreteInformerInterface>;

        mockScheduleInformer = {
            inform: jest.fn(),
        } as unknown as jest.Mocked<ConcreteInformerInterface>;

        mockOutageInformer = {
            inform: jest.fn(),
        } as jest.Mocked<ConcreteInformerInterface>;

        informer = new Informer(
            mockStatisticsInformer,
            mockScheduleInformer,
            mockOutageInformer,
        );
    });

    it('should inform statistics and schedule daily', () => {
        const options = {
            nowDate: new Date(mockDate.valueOf() + (TIME.DAY * 2)),
            config: {
                ...defaultConfigOptions,
                STATISTICS: {
                    INFORM_TIME: '23:58',
                },
                SCHEDULE: {
                    INFORM_TIME: '21:00',
                },
            },
        };

        informer.inform('STATISTICS', options);
        informer.inform('SCHEDULE', options);

        expect(mockStatisticsInformer.inform).toHaveBeenCalledWith(options.config);
        expect(mockScheduleInformer.inform).toHaveBeenCalledWith(options.config);
        expect(mockOutageInformer.inform).not.toHaveBeenCalled();
    });

    it('should inform future outage per minute', () => {
        const options = {
            nowDate: new Date(mockDate.valueOf() + (TIME.MINUTE * 2)),
            config: {
                ...defaultConfigOptions,
                FUTURE_OUTAGE: {
                    MINUTES: 30,
                },
            },
        };

        informer.inform('FUTURE_OUTAGE', options);

        expect(mockStatisticsInformer.inform).not.toHaveBeenCalled();
        expect(mockScheduleInformer.inform).not.toHaveBeenCalled();
        expect(mockOutageInformer.inform).toHaveBeenCalledWith(options.config);
    });

    it('should not inform if config is not defined', () => {
        const options = {
            nowDate: mockDate,
            config: {
                ...defaultConfigOptions,
            },
        };

        expect(() => informer.inform('STATISTICS', options)).toThrow('Informer: Undefined config');
        expect(() => informer.inform('SCHEDULE', options)).toThrow('Informer: Undefined config');
        expect(() => informer.inform('FUTURE_OUTAGE', options)).toThrow('Informer: Undefined config');
    });

    it('should not call informer when frequency is smaller than minDifference (DAY)', () => {
        const informSpy = jest.spyOn(informer as any, 'informWithFrequency');

        informer.inform('STATISTICS', { nowDate: mockDate, config: mockConfig });
        informer.inform('STATISTICS', { nowDate: new Date(mockDate.valueOf() + (TIME.MINUTE * 15)), config: mockConfig });
        informer.inform('STATISTICS', { nowDate: new Date(mockDate.valueOf() + (TIME.MINUTE * 30)), config: mockConfig });
        informer.inform('STATISTICS', { nowDate: new Date(mockDate.valueOf() + (TIME.MINUTE * 45)), config: mockConfig });
        informer.inform('STATISTICS', { nowDate: new Date(mockDate.valueOf() + (TIME.DAY * 2)), config: mockConfig });

        expect(informSpy).toHaveBeenCalledTimes(5);
        expect(mockStatisticsInformer.inform).toHaveBeenCalledTimes(1);
    });

    it('should not call informer when frequency is smaller than minDifference (MINUTE)', () => {
        const informSpy = jest.spyOn(informer as any, 'informWithFrequency');

        informer.inform('FUTURE_OUTAGE', { nowDate: mockDate, config: mockConfig });
        informer.inform('FUTURE_OUTAGE', { nowDate: new Date(mockDate.valueOf() + (TIME.SECOND * 15)), config: mockConfig });
        informer.inform('FUTURE_OUTAGE', { nowDate: new Date(mockDate.valueOf() + (TIME.SECOND * 30)), config: mockConfig });
        informer.inform('FUTURE_OUTAGE', { nowDate: new Date(mockDate.valueOf() + (TIME.SECOND * 45)), config: mockConfig });
        informer.inform('FUTURE_OUTAGE', { nowDate: new Date(mockDate.valueOf() + (TIME.MINUTE * 2)), config: mockConfig });

        expect(informSpy).toHaveBeenCalledTimes(5);
        expect(mockOutageInformer.inform).toHaveBeenCalledTimes(1);
    });
});
