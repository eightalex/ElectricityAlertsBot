import {MonitorsConfigType} from '../../types/MonitorsConfigType';

export const MONITORS_CONFIG: MonitorsConfigType = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        TELEGRAM_CHATS: [
            {
                chat_id: '@kombinatna_alerts',
            },
            {
                chat_id: '-1001811166479',
                message_thread_id: 567,
            },
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
                chat_id: '@drahomanova_alerts',
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
                chat_id: '@yaroslava_mudroho_alerts',
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
    {
        ID: 4,
        NAME: 'brest_lytovskiy',
        TELEGRAM_CHATS: [
            {
                chat_id: '@brest_lytovskiy_alerts',
            },
        ],
        MONITORS: [793361189],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: false,
        },
    },
    {
        ID: 5,
        NAME: 'parkovi_ozera',
        TELEGRAM_CHATS: [
            {
                chat_id: '@parkovi_ozera_alerts',
            },
        ],
        MONITORS: [793597038],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
    {
        ID: 6,
        NAME: 'rusanivski_sady',
        TELEGRAM_CHATS: [
            {
                chat_id: '@rusanivski_sady_alerts',
            },
        ],
        MONITORS: [793469661],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
];

export const MONITORS_CONFIG_DEV: MonitorsConfigType = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        TELEGRAM_CHATS: [
            {
                chat_id: '@kombinatna_test_alerts',
            },
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
    {
        ID: 4,
        NAME: 'brest_lytovskiy',
        TELEGRAM_CHATS: [
            {
                chat_id: '@brest_lytovskiy_test_alerts',
            },
        ],
        MONITORS: [793361189],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: false,
        },
    },
    {
        ID: 5,
        NAME: 'parkovi_ozera',
        TELEGRAM_CHATS: [
            {
                chat_id: '@parkovi_ozera_alerts',
            },
        ],
        MONITORS: [793597038],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
    {
        ID: 6,
        NAME: 'rusanivski_sady',
        TELEGRAM_CHATS: [
            {
                chat_id: '@rusanivski_sady_test_alerts',
            },
        ],
        MONITORS: [793469661],
        STATISTICS: {
            IS_ENABLED: true,
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            IS_ENABLED: true,
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
];
