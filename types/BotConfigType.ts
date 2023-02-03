import {TelegramChatType} from './TelegramChatType';

export type BotConfigType = {
    ID: number
    NAME: string
    DEPENDENCY_ID?: number
    MONITORS?: number[]
    TELEGRAM_CHATS: TelegramChatType[]
    STATISTICS?: {
        INFORM_TIME: string
    }
    SCHEDULE?: {
        INFORM_TIME: string
        CALENDAR_URL: string
    }
};
