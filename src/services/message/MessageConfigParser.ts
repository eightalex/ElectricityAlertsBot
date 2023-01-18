import {STRING} from '../../constants/string';
import {MessageConfigType} from '../../../types/MessageConfigType';

export interface MessageConfigParserInterface {
    parse(config: string): MessageConfigType[]
}

export class MessageConfigParser implements MessageConfigParserInterface {
    parse(config: string): MessageConfigType[] {
        const chats = config.split(STRING.COMMA);
        return chats.map(chat => {
            const [chat_id, message_thread_id] = chat.split(STRING.COLON);
            return {
                chat_id: chat_id || '',
                ...(message_thread_id && {message_thread_id: parseInt(message_thread_id, 10)}),
            };
        });
    }
}
