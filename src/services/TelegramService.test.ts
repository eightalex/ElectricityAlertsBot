import {UrlFetchApp} from 'gasmask';
import {TelegramService} from './TelegramService';

describe('TelegramService', () => {
    let telegramService: TelegramService;

    beforeEach(() => {
        jest.spyOn(UrlFetchApp, 'fetch').mockImplementation(() => ({
            getAllHeaders: jest.fn(),
            getAs: jest.fn(),
            getBlob: jest.fn(),
            getContent: jest.fn(),
            getContentText: jest.fn(),
            getHeaders: jest.fn(),
            getResponseCode: jest.fn(),
        }));
        // @ts-ignore
        telegramService = new TelegramService(UrlFetchApp);
    });

    describe('sendMessage', () => {
        it('should send a message to the configured chat', () => {
            const mockFetch = jest.spyOn(UrlFetchApp, 'fetch');
            const message = 'Hello, world!';

            telegramService.sendMessage(message);

            expect(mockFetch).toHaveBeenCalledWith(
                `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/sendMessage`,
                {
                    method: 'post',
                    payload: {
                        chat_id: process.env.TELEGRAM_CHAT,
                        text: message,
                        disable_notification: false,
                    },
                },
            );
        });

        it('should send a silent message to the configured chat if specified in the options', () => {
            const mockFetch = jest.spyOn(UrlFetchApp, 'fetch');
            const message = 'Hello, world!';
            const options = {
                silent: true,
            };

            telegramService.sendMessage(message, options);

            expect(mockFetch).toHaveBeenCalledWith(
                `https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/sendMessage`,
                {
                    method: 'post',
                    payload: {
                        chat_id: process.env.TELEGRAM_CHAT,
                        text: message,
                        disable_notification: true,
                    },
                },
            );
        });
    });
});
