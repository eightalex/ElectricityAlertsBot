import {MessageGenerator, MessageGeneratorInterface} from './MessageGenerator';
import {TimeDifferenceGenerator} from '../TimeDifferenceGenerator';
import {Yasno} from '../Yasno';

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

    beforeEach(() => {
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
    });
});
