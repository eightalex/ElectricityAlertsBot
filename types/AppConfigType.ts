export type AppConfigType = HouseConfigType[];

export type HouseConfigType = {
    ID: number
    NAME: string
    TELEGRAM_CHAT: string
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
