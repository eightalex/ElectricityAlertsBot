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
        HEARTBEAT: true,
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
    {
        ID: 7,
        NAME: 'shchaslyvyi',
        MONITORS: [793643936],
        TELEGRAM_CHATS: [{chat_id: '@shchaslyvyi_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 8,
        NAME: 'krasnova17',
        DEPENDENCY_ID: 2,
        MONITORS: [793653580],
        TELEGRAM_CHATS: [{chat_id: '@krasnova17_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 9,
        NAME: 'zdanovskoi',
        MONITORS: [793658208],
        TELEGRAM_CHATS: [{chat_id: '@zdanovskoi_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/1.ics',
        },
    },
    {
        ID: 10,
        NAME: 'irpinska64',
        DEPENDENCY_ID: 2,
        MONITORS: [793682351],
        TELEGRAM_CHATS: [{chat_id: '@irpinska_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
        },
    },
    {
        ID: 11,
        NAME: 'heroiv_dnipra',
        MONITORS: [793700576],
        TELEGRAM_CHATS: [{chat_id: '@heroiv_dnipra_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '08:00',
            CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/1.ics',
        },
    },
    {
        ID: 12,
        NAME: 'chervonoyi_kalyny',
        MONITORS: [793701992],
        TELEGRAM_CHATS: [{chat_id: '@chervonoyi_kalyny_alerts'}],
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
        ID: 4,
        NAME: 'brest_lytovskiy',
        HEARTBEAT: true,
        TELEGRAM_CHATS: [{chat_id: '@brest_lytovskiy_test_alerts'}],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
];
