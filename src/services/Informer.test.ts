import {Informer} from './Informer';
import {StatisticsInformerInterface} from './statistics/StatisticsInformer';
import {ScheduleInformerInterface} from './ScheduleInformer';
import {OutageInformerInterface} from './OutageInformer';

const PropertiesService = {
    getUserProperties: jest.fn().mockImplementation(() => ({
        getProperty: jest.fn().mockReturnValue('1719352531707'),
        setProperty: jest.fn(),
    })),
};

(global as any).PropertiesService = PropertiesService;

const defaultConfigOptions = {
    ID: 1,
    NAME: 'Test',
    TELEGRAM_CHATS: [{chat_id: '@chat'}],
};

describe('Informer', () => {
    let informer: Informer;
    let mockStatisticsInformer: jest.Mocked<StatisticsInformerInterface>;
    let mockScheduleInformer: jest.Mocked<ScheduleInformerInterface>;
    let mockOutageInformer: jest.Mocked<OutageInformerInterface>;

    beforeEach(() => {
        mockStatisticsInformer = {
            inform: jest.fn(),
        } as any;
        mockScheduleInformer = {
            inform: jest.fn(),
        } as any;
        mockOutageInformer = {
            inform: jest.fn(),
        } as any;
        informer = new Informer(mockStatisticsInformer, mockScheduleInformer, mockOutageInformer);
    });

    it('should inform statistics and schedule daily', () => {
        const options = {
            nowDate: new Date(),
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
            nowDate: new Date(),
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
            nowDate: new Date(),
            config: {
                ...defaultConfigOptions,
            },
        };

        expect(() => informer.inform('STATISTICS', options)).toThrow('Informer: Undefined config');
        expect(() => informer.inform('SCHEDULE', options)).toThrow('Informer: Undefined config');
        expect(() => informer.inform('FUTURE_OUTAGE', options)).toThrow('Informer: Undefined config');
    });
});
