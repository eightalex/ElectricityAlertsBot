import {TelegramChatType} from './TelegramChatType';

export type BotConfigType = {
    ID: number
    NAME: string
    DEPENDENCY_ID?: number
    MONITORS?: number[]
    TELEGRAM_CHATS: TelegramChatType[]
    STATISTICS: {
        IS_ENABLED: boolean
        INFORM_TIME: string
    }
    SCHEDULE: {
        IS_ENABLED: boolean
        INFORM_TIME?: string
        CALENDAR_URL?: string
    }
};
