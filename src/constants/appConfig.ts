import {AppConfigType} from '../../types/AppConfigType';

export const APP_CONFIG: AppConfigType = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        TELEGRAM_CHAT: '@kombinatna_test_alerts',
        MONITORS: [793106398, 793136583, 793140117, 793214785],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 2,
        NAME: 'drahomanova31',
        TELEGRAM_CHAT: '@drahomanova_alerts',
        MONITORS: [793359543],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 3,
        NAME: 'brest_lytovskiy',
        TELEGRAM_CHAT: '@brest_lytovskiy_alerts',
        MONITORS: [793361189],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: false,
        },
    },
];
