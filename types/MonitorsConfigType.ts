import {TelegramChatsType} from './TelegramChatsType';

export type MonitorsConfigType = HouseConfigType[];

export type HouseConfigType = {
    ID: number
    NAME: string
    TELEGRAM_CHATS: TelegramChatsType[]
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
