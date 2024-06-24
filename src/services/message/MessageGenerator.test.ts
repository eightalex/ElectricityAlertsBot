import {MessageGenerator, MessageGeneratorInterface} from './MessageGenerator';
import {TimeDifferenceGenerator} from '../TimeDifferenceGenerator';
import {Yasno, YasnoInterface} from '../Yasno';
import {REGION} from '../../constants/region';

const defaultFetchMethods = {
    getAllHeaders: jest.fn(),
    getAs: jest.fn(),
    getBlob: jest.fn(),
    getContent: jest.fn(),
    getResponseCode: jest.fn(),
    isSslCertificateValid: jest.fn(),
    getHeaders: jest.fn(),
}

const UrlFetchApp = {
    fetch: jest.fn().mockImplementation(() => ({
        getContentText: jest.fn().mockReturnValue(JSON.stringify({components: []})),
        ...defaultFetchMethods,
    })),
};

(global as any).UrlFetchApp = UrlFetchApp;

jest.mock('../TimeDifferenceGenerator', () => {
    return {
        TimeDifferenceGenerator: jest.fn().mockImplementation(() => {
            return {
                generate: jest.fn().mockReturnValue('1 годину'),
            };
        }),
    };
});

describe('MessageGenerator', () => {
    let messageGenerator: MessageGeneratorInterface;
    let mockYasno: jest.Mocked<YasnoInterface>;

    beforeEach(() => {
        mockYasno = {
            getNextOutage: jest.fn(),
        } as any;
        messageGenerator = new MessageGenerator(new TimeDifferenceGenerator(), new Yasno());
    });

    describe('generate', () => {
        it('should generate the message when the power is available', () => {
            const options = {
                isAvailable: true,
                lastTime: '1623141563000',
                pingOptions: {
                    config: {
                        ID: 1,
                        NAME: 'Test Config',
                        TELEGRAM_CHATS: [{chat_id: '@chat',}],
                        MONITORS: [793359540, 793359541],
                    },
                    nowDate: new Date('2022-01-01T01:01:01.000Z'),
                },
            };

            const message = messageGenerator.generate(options);

            expect(message).toEqual('🟢 З\'явилось світло\n\nВідключення тривало\n1 годину');
        });

        it('should generate the message when the power is not available and it was available previously', () => {
            const options = {
                isAvailable: false,
                lastTime: '1623141563000',
                pingOptions: {
                    config: {
                        ID: 1,
                        NAME: 'Test Config',
                        TELEGRAM_CHATS: [{chat_id: '@chat',}],
                        MONITORS: [793359540, 793359541],
                    },
                    nowDate: new Date('2022-01-01T01:01:01.000Z'),
                },
            };

            const expectedResult = [
                '⚫️ Зникло світло\n\nЕлектропостачання було наявне\n1 годину',
                '⚫️ Зникло світло\n\nЕлектрохарчування було наявне\n1 годину',
            ];

            const message = messageGenerator.generate(options);

            expect(expectedResult).toContain(message);
        });

        it('should generate the message when the power is not available and it was not available previously', () => {
            const options = {
                isAvailable: false,
                lastTime: '0',
                pingOptions: {
                    config: {
                        ID: 1,
                        NAME: 'Test Config',
                        TELEGRAM_CHATS: [{chat_id: '@chat',}],
                        MONITORS: [793359540, 793359541],
                    },
                    nowDate: new Date('2022-01-01T01:01:01.000Z'),
                },
            };

            const message = messageGenerator.generate(options);

            expect(message).toEqual('⚫️ Зникло світло');
        });

        it('should generate the message when the power is available and the message is set in the config', () => {
            const options = {
                isAvailable: true,
                lastTime: '0',
                pingOptions: {
                    config: {
                        ID: 1,
                        NAME: 'Test Config',
                        TELEGRAM_CHATS: [{chat_id: '@chat',}],
                        MONITORS: [793359540, 793359541],
                        MESSAGE: {
                            AVAILABLE: 'Test message available',
                            UNAVAILABLE: 'Test message unavailable',
                        },
                    },
                    nowDate: new Date('2022-01-01T01:01:01.000Z'),
                },
            };

            const message = messageGenerator.generate(options);

            expect(message).toEqual('Test message available');
        });

        // it('should generate the message when the power is available and outage is expected', () => {
        //     const options = {
        //         isAvailable: true,
        //         lastTime: '1623141563000',
        //         pingOptions: {
        //             config: {
        //                 ID: 1,
        //                 NAME: 'Test Config',
        //                 TELEGRAM_CHATS: [{chat_id: '@chat',}],
        //                 MONITORS: [793359540, 793359541],
        //                 REGION: REGION.KYIV,
        //                 GROUP: 1,
        //             },
        //             nowDate: new Date('2022-01-01T01:01:01.000Z'),
        //         },
        //     };
        //
        //     mockYasno.getNextOutage.mockReturnValue({start: 2, end: 3, type: 'DEFINITE_OUTAGE'});
        //
        //     const message = messageGenerator.generate(options);
        //
        //     expect(message).toContain('\nНаступне відключення о 02:00');
        // });
        //
        // it('should generate the message when the power is not available and outage end is expected', () => {
        //     const options = {
        //         isAvailable: false,
        //         lastTime: '1623141563000',
        //         pingOptions: {
        //             config: {
        //                 ID: 1,
        //                 NAME: 'Test Config',
        //                 TELEGRAM_CHATS: [{chat_id: '@chat',}],
        //                 MONITORS: [793359540, 793359541],
        //                 REGION: REGION.KYIV,
        //                 GROUP: 1,
        //             },
        //             nowDate: new Date('2022-01-01T01:01:01.000Z'),
        //         },
        //     };
        //
        //     mockYasno.getNextOutage.mockReturnValue({start: 2, end: 3, type: 'DEFINITE_OUTAGE'});
        //
        //     const message = messageGenerator.generate(options);
        //
        //     expect(message).toContain('\nМає бути відновлено о 03:00');
        // });

        it('should not include outage message when there is no outage expected', () => {
            const options = {
                isAvailable: true,
                lastTime: '1623141563000',
                pingOptions: {
                    config: {
                        ID: 1,
                        NAME: 'Test Config',
                        TELEGRAM_CHATS: [{chat_id: '@chat',}],
                        MONITORS: [793359540, 793359541],
                        REGION: REGION.KYIV,
                        GROUP: 1,
                    },
                    nowDate: new Date('2022-01-01T01:01:01.000Z'),
                },
            };

            mockYasno.getNextOutage.mockReturnValue(null);

            const message = messageGenerator.generate(options);

            expect(message).not.toContain('\nНаступне відключення о');
            expect(message).not.toContain('\nМає бути відновлено о');
        });
    });
});
