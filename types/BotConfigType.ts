import {ChatType} from './TelegramType';
import {RegionType} from './YasnoType';

export type BotConfigType = {
    ID: number
    NAME: string
    TITLE?: {
        AVAILABLE: string
        UNAVAILABLE: string
    }
    REGION?: RegionType
    GROUP?: number
    DEPENDENCY_ID?: number
    HEARTBEAT?: boolean
    MONITORS?: number[]
    TELEGRAM_CHATS: ChatType[]
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
