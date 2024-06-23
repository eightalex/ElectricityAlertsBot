import {BotConfigType} from '../../types/BotConfigType';
import {REGION} from './region';

export const MONITORS_MAP = {
    UNDERNET_25A_2_SECTION: 793214785,
    BOILER_SOCKET_4_SECTION: 793535128,
    MYKHAILIVSKA: 797113177,
};

export const MONITORS_CONFIG: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        REGION: REGION.KYIV,
        GROUP: 5,
        MONITORS: [
            MONITORS_MAP.UNDERNET_25A_2_SECTION,
            MONITORS_MAP.BOILER_SOCKET_4_SECTION,
        ],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001811166479', message_thread_id: 567},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '21:00',
        },
        FUTURE_OUTAGE: {
            MINUTES: 30,
        },
    },
    {
        ID: 2,
        NAME: 'mykhailivska',
        MONITORS: [MONITORS_MAP.MYKHAILIVSKA],
        TELEGRAM_CHATS: [
            {chat_id: '@mykhailivska_alerts'},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
];

export const MONITORS_CONFIG_DEV: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
        REGION: REGION.KYIV,
        GROUP: 5,
        MONITORS: [
            MONITORS_MAP.UNDERNET_25A_2_SECTION,
            MONITORS_MAP.BOILER_SOCKET_4_SECTION,
        ],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        SCHEDULE: {
            INFORM_TIME: '21:00',
        },
        FUTURE_OUTAGE: {
            MINUTES: 30,
        },
    },
    {
        ID: 2,
        NAME: 'mykhailivska',
        MONITORS: [MONITORS_MAP.MYKHAILIVSKA],
        TELEGRAM_CHATS: [
            {chat_id: '@mykhailivska_alerts'},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
    {
        ID: 3,
        NAME: 'kombinatna25a_2_section',
        MONITORS: [MONITORS_MAP.UNDERNET_25A_2_SECTION],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло в 2 секції',
            UNAVAILABLE: '⚫️ Зникло світло в 2 секції',
        },
    },
    {
        ID: 4,
        NAME: 'kombinatna25a_4_section',
        MONITORS: [MONITORS_MAP.BOILER_SOCKET_4_SECTION],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло в 4 секції',
            UNAVAILABLE: '⚫️ Зникло світло в 4 секції',
        },
    },
];
