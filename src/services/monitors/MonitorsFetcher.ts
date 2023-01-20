import {APP} from '../../constants/app';

export interface MonitorsFetcherInterface {
    fetch(): UptimeRobot.MonitorType[]
}

export class MonitorsFetcher implements MonitorsFetcherInterface {
    fetch(): UptimeRobot.MonitorType[] {
        const result = UrlFetchApp.fetch('https://api.uptimerobot.com/v2/getMonitors', {
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'cache-control': 'no-cache',
            },
            payload: {
                api_key: APP.UPTIME_ROBOT.API_KEY,
                format: 'json',
            },
        });

        const response = JSON.parse(result.getContentText());
        return response.monitors;
    }
}
