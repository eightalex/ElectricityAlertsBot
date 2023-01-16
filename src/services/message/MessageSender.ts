import {TelegramServiceInterface} from '../TelegramService';
import {MessageConfigType} from '../../../types/MessageConfigType';

export interface MessageSenderInterface {
    send(message: string, config: MessageConfigType[]): void
}

export class MessageSender implements MessageSenderInterface {
    constructor(
        private telegramService: TelegramServiceInterface,
    ) {}

    send(message: string, config: MessageConfigType[]) {
        config.forEach(config => {
            this.telegramService.sendMessage({text: message, ...config});
        });
    }
}
