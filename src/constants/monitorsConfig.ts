import {BotConfigType} from '../../types/BotConfigType';

export const MONITORS_CONFIG: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        DEPENDENCY_ID: 2,
        MONITORS: [793136583, 793214785],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001811166479', message_thread_id: 567},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 2,
        NAME: 'drahomanova31',
        DEPENDENCY_ID: 1,
        MONITORS: [793359543],
        TELEGRAM_CHATS: [{chat_id: '@drahomanova_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
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
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 4,
        NAME: 'brest_lytovskiy',
        MONITORS: [793361189],
        TELEGRAM_CHATS: [{chat_id: '@brest_lytovskiy_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 5,
        NAME: 'parkovi_ozera',
        DEPENDENCY_ID: 6,
        MONITORS: [793597038],
        TELEGRAM_CHATS: [{chat_id: '@parkovi_ozera_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
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
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
];

export const MONITORS_CONFIG_DEV: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        DEPENDENCY_ID: 2,
        MONITORS: [793136583, 793214785],
        TELEGRAM_CHATS: [{chat_id: '@kombinatna_test_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 2,
        NAME: 'drahomanova31',
        DEPENDENCY_ID: 1,
        MONITORS: [793359543],
        TELEGRAM_CHATS: [{chat_id: '@drahomanova_test_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
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
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 4,
        NAME: 'brest_lytovskiy',
        MONITORS: [793361189],
        TELEGRAM_CHATS: [{chat_id: '@brest_lytovskiy_test_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 5,
        NAME: 'parkovi_ozera',
        DEPENDENCY_ID: 6,
        MONITORS: [793597038],
        TELEGRAM_CHATS: [{chat_id: '@parkovi_ozera_test_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
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
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/2.ics',
        },
    },
];
