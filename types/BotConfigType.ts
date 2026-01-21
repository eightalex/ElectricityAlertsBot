import {ChatType} from './TelegramType';

export type BotConfigType = {
    ID: number
    NAME: string
    TITLE?: {
        AVAILABLE: string
        UNAVAILABLE: string
    }
    REGION?: string
    GROUP?: number | string
    DEPENDENCY_ID?: number
    MONITORS?: number[]
    TELEGRAM_CHATS: ChatType[]
    STATISTICS?: {
        INFORM_TIME: string
    }
    MESSAGE?: {
        AVAILABLE?: string
        UNAVAILABLE?: string
    }
};
