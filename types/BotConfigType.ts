import {TelegramChatType} from './TelegramChatType';
import {RegionType} from './YasnoType';

export type BotConfigType = {
    ID: number
    NAME: string
    REGION?: RegionType
    GROUP?: number
    DEPENDENCY_ID?: number
    HEARTBEAT?: boolean
    MONITORS?: number[]
    TELEGRAM_CHATS: TelegramChatType[]
    STATISTICS?: {
        INFORM_TIME: string
    }
    SCHEDULE?: {
        INFORM_TIME: string
    }
    FUTURE_OUTAGE?: {
        MINUTES: number
    }
    MESSAGE?: {
        AVAILABLE?: string
        UNAVAILABLE?: string
    }
};
