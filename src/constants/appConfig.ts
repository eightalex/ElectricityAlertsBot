import {AppConfigType} from '../../types/AppConfigType';

export const APP_CONFIG: AppConfigType = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        TELEGRAM_CHATS: [
            {
                chat_id: '@kombinatna_test_alerts',
            },
            // {
            //     chat_id: '-1001811166479',
            //     message_thread_id: 567,
            // },
        ],
        MONITORS: [793136583, 793214785],
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
        TELEGRAM_CHATS: [
            {
                chat_id: '@drahomanova_test_alerts',
            },
        ],
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
        NAME: 'yaroslava_mudroho',
        TELEGRAM_CHATS: [
            {
                chat_id: '@yaroslava_mudroho_test_alerts',
            },
        ],
        MONITORS: [793494529],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: false,
        },
    },
];
