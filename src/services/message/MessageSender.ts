import {TelegramServiceInterface} from '../TelegramService';
import {TelegramChatType} from '../../../types/TelegramChatType';

export interface MessageSenderInterface {
    send(message: string, config: TelegramChatType[]): void
}

export class MessageSender implements MessageSenderInterface {
    constructor(
        private telegramService: TelegramServiceInterface,
    ) {}

    send(message: string, config: TelegramChatType[]) {
        config.forEach(config => {
            this.telegramService.sendMessage({text: message, ...config});
        });
    }
}
