import {MessageGenerator, MessageGeneratorInterface} from './MessageGenerator';
import {TimeDifferenceGenerator} from '../TimeDifferenceGenerator';

jest.mock('./TimeDifferenceGenerator', () => {
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
        messageGenerator = new MessageGenerator(new TimeDifferenceGenerator());
    });

    describe('generate', () => {
        it('should generate the message when the power is available', () => {
            const options = {
                isAvailable: true,
                lastTime: '1623141563000',
                nowDate: new Date('2022-01-01T01:01:01.000Z'),
            };

            const message = messageGenerator.generate(options);

            expect(message).toEqual('🟢 З\'явилось світло\n\nВідключення тривало\n1 годину');
        });

        it('should generate the message when the power is not available and it was available previously', () => {
            const options = {
                isAvailable: false,
                lastTime: '1623141563000',
                nowDate: new Date('2022-01-01T01:01:01.000Z'),
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
                nowDate: new Date('2022-01-01T01:01:01.000Z'),
            };

            const message = messageGenerator.generate(options);

            expect(message).toEqual('⚫️ Зникло світло');
        });
    });
});
