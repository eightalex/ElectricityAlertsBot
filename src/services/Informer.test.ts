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

    beforeEach(() => {
        mockStatisticsInformer = {
            inform: jest.fn(),
        } as jest.Mocked<ConcreteInformerInterface>;

        informer = new Informer(
            mockStatisticsInformer,
        );
    });

    it('should inform statistics daily', () => {
        const options = {
            nowDate: new Date(mockDate.valueOf() + (TIME.DAY * 2)),
            config: {
                ...defaultConfigOptions,
                STATISTICS: {
                    INFORM_TIME: '23:58',
                },
            },
        };

        informer.inform('STATISTICS', options);

        expect(mockStatisticsInformer.inform).toHaveBeenCalledWith(options.config);
    });

    it('should inform even if STATISTICS config is not defined', () => {
        const options = {
            nowDate: mockDate,
            config: {
                ...defaultConfigOptions,
            },
        };

        informer.inform('STATISTICS', options);

        expect(mockStatisticsInformer.inform).toHaveBeenCalledWith(options.config);
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
});
