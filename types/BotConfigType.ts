import {TelegramChatType} from './TelegramChatType';
import {RegionType} from './YasnoType';

export type BotConfigType = {
    ID: number
    NAME: string
    DEPENDENCY_ID?: number
    HEARTBEAT?: boolean
    MONITORS?: number[]
    TELEGRAM_CHATS: TelegramChatType[]
    STATISTICS?: {
        INFORM_TIME: string
    }
    SCHEDULE?: {
        INFORM_TIME: string
        GROUP: number
        REGION: RegionType
    }
    FUTURE_OUTAGE?: {
        MINUTES: number
        GROUP: number
        REGION: RegionType
    }
    MESSAGE?: {
        AVAILABLE?: string
        UNAVAILABLE?: string
    }
};
