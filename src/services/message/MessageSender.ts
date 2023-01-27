import {TelegramServiceInterface} from '../TelegramService';
import {TelegramChatsType} from '../../../types/TelegramChatsType';

export interface MessageSenderInterface {
    send(message: string, config: TelegramChatsType[]): void
}

export class MessageSender implements MessageSenderInterface {
    constructor(
        private telegramService: TelegramServiceInterface,
    ) {}

    send(message: string, config: TelegramChatsType[]) {
        config.forEach(config => {
            this.telegramService.sendMessage({text: message, ...config});
        });
    }
}
