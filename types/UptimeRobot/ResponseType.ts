namespace UptimeRobot {
    export type ResponseType = {
        stat: string
        pagination: {
            offset: number
            limit: number
            total: number
        }
        monitors: UptimeRobot.MonitorType[]
    }
}
