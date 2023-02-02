import {MonitorsConfigType} from '../../types/MonitorsConfigType';

export const MONITORS_CONFIG: MonitorsConfigType = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        MONITORS: [793136583, 793214785],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001811166479', message_thread_id: 567}
        ],
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
        MONITORS: [793359543],
        TELEGRAM_CHATS: [{chat_id: '@drahomanova_alerts'}],
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
        MONITORS: [793494529],
        TELEGRAM_CHATS: [{chat_id: '@yaroslava_mudroho_alerts'}],
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
        MONITORS: [793361189],
        TELEGRAM_CHATS: [{chat_id: '@brest_lytovskiy_alerts'}],
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
        MONITORS: [793597038],
        TELEGRAM_CHATS: [{chat_id: '@parkovi_ozera_alerts'}],
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
        MONITORS: [793469661],
        TELEGRAM_CHATS: [{chat_id: '@rusanivski_sady_alerts'}],
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
        MONITORS: [793136583, 793214785],
        TELEGRAM_CHATS: [{chat_id: '@kombinatna_test_alerts'}],
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
        MONITORS: [793359543],
        TELEGRAM_CHATS: [{chat_id: '@drahomanova_test_alerts'}],
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
        MONITORS: [793494529],
        TELEGRAM_CHATS: [{chat_id: '@yaroslava_mudroho_test_alerts'}],
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
        MONITORS: [793361189],
        TELEGRAM_CHATS: [{chat_id: '@brest_lytovskiy_test_alerts'}],
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
        MONITORS: [793597038],
        TELEGRAM_CHATS: [{chat_id: '@parkovi_ozera_alerts'}],
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
        MONITORS: [793469661],
        TELEGRAM_CHATS: [{chat_id: '@rusanivski_sady_test_alerts'}],
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
