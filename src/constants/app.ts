import {MessageConfigParser} from '../services/message/MessageConfigParser';

export const APP = {
    UPTIME_ROBOT: {
        API_KEY: process.env.UPTIME_ROBOT_API_KEY || '',
        MONITORS: process.env.UPTIME_ROBOT_MONITORS || '',
    },
    TELEGRAM: {
        API_KEY: process.env.TELEGRAM_API_KEY || '',
        MESSAGE_CONFIG: new MessageConfigParser().parse(process.env.TELEGRAM_CHATS || ''),
    },
    SCHEDULE: {
        IS_ENABLED: process.env.SCHEDULE_ENABLED === '1',
        INFORM_TIME: process.env.SCHEDULE_INFORM_TIME || '08:00',
        CALENDAR_URL: process.env.CALENDAR_URL || 'https://shutdown-calendar.fly.dev/calendar/3.ics',
    },
    STATISTICS: {
        IS_ENABLED: process.env.STATISTICS_ENABLED === '1',
        INFORM_TIME: process.env.STATISTICS_INFORM_TIME || '23:58',
    },
};
