export interface MonitorsFetcherInterface {
    fetch(monitorsConfig: Record<string, number>): UptimeRobot.MonitorType[]
}

export class MonitorsFetcher implements MonitorsFetcherInterface {
    fetch(monitorsConfig: Record<string, number>): UptimeRobot.MonitorType[] {
        const result = UrlFetchApp.fetch('https://api.uptimerobot.com/v2/getMonitors', {
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            payload: {
                api_key: process.env.UPTIME_ROBOT_API_KEY,
                monitors: Object.values(monitorsConfig).join('-'),
                format: 'json',
            },
        });

        const response = JSON.parse(result.getContentText());
        return response.monitors;
    }
}
