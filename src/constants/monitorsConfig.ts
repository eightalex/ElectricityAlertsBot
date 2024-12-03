import {BotConfigType} from '../../types/BotConfigType';
import {REGION} from './region';

export const MONITORS_MAP = {
    UNDERNET_25A_2_SECTION: 793214785,
    BOILER_SOCKET_4_SECTION: 793535128,
    ESP_32_25A_4_SECTION: 798135710,
    MYKHAILIVSKA: 797113177,
    YAROSLAVA_MUDROHO: 797254797,
};

// Do never change id's
export const IDS = {
    KOMBINATNA_25A: 1,
    MYKHAILIVSKA: 2,
    KOMBINATNA25A_2_SECTION: 3,
    KOMBINATNA25A_4_SECTION: 4,
    YAROSLAVA_MUDROHO: 5,
};

export const MONITORS_CONFIG: BotConfigType[] = [
    {
        ID: IDS.KOMBINATNA25A_4_SECTION,
        NAME: 'kombinatna25a_4_section',
        REGION: REGION.KYIV,
        GROUP: 5,
        MONITORS: [
            MONITORS_MAP.BOILER_SOCKET_4_SECTION,
            MONITORS_MAP.UNDERNET_25A_2_SECTION,
            MONITORS_MAP.ESP_32_25A_4_SECTION,
        ],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001811166479', message_thread_id: 567},
        ],
        SCHEDULE: {
            INFORM_TIME: '20:00',
        },
        FUTURE_OUTAGE: {
            MINUTES: 30,
        },
    },
    {
        ID: IDS.MYKHAILIVSKA,
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
        ID: IDS.YAROSLAVA_MUDROHO,
        NAME: 'yaroslava_mudroho',
        MONITORS: [MONITORS_MAP.YAROSLAVA_MUDROHO],
        TELEGRAM_CHATS: [
            {chat_id: '@yaroslava_mudroho_alerts'}
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
    },
];

export const MONITORS_CONFIG_DEV: BotConfigType[] = [
    {
        ID: IDS.KOMBINATNA_25A,
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
            INFORM_TIME: '20:00',
        },
        FUTURE_OUTAGE: {
            MINUTES: 30,
        },
    },
    {
        ID: IDS.KOMBINATNA25A_4_SECTION,
        NAME: 'kombinatna25a_4_section',
        MONITORS: [MONITORS_MAP.BOILER_SOCKET_4_SECTION],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло (ТП 1)',
            UNAVAILABLE: '⚫️ Зникло світло (ТП 1)',
        },
    },
    {
        ID: IDS.KOMBINATNA25A_2_SECTION,
        NAME: 'kombinatna25a_2_section',
        MONITORS: [MONITORS_MAP.UNDERNET_25A_2_SECTION],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло (ТП 2)',
            UNAVAILABLE: '⚫️ Зникло світло (ТП 2)',
        },
    },
];
