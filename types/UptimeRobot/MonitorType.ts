namespace UptimeRobot {
    export type MonitorType = {
        id: number
        friendly_name: string
        url: string
        type: number
        sub_type: string
        keyword_type: null
        keyword_case_type: null
        keyword_value: string
        http_username: string
        http_password: string
        port: string
        interval: number
        timeout: number
        status: number
        create_datetime: number
    }
}
