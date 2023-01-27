import {TelegramChatType} from './TelegramChatType';

export type MonitorsConfigType = HouseConfigType[];

export type HouseConfigType = {
    ID: number
    NAME: string
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
    MONITORS: number[]
};
