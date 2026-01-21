import {BotConfigType} from '../../types/BotConfigType';
import {REGION} from './region';

export const MONITORS_MAP = {
    UNDERNET_25A_2_SECTION: 793214785,
    BOILER_SOCKET_4_SECTION: 793535128,
    ESP_32_25A_4_SECTION: 798135710,
    MYKHAILIVSKA: 797113177,
    YAROSLAVA_MUDROHO: 797254797,
    KOMNINATNA_25_A_ESP32: 802163823,
    SADOVA_49A: 802191390,
};

// Do never change id's
export const IDS = {
    KOMBINATNA_25A: 1,
    MYKHAILIVSKA: 2,
    KOMBINATNA25A_2_SECTION: 3,
    KOMBINATNA25A_4_SECTION: 4,
    YAROSLAVA_MUDROHO: 5,
    KOMNINATNA_25_A_ESP32: 6,
    SADOVA_49A: 7,
};

export const MONITORS_CONFIG: BotConfigType[] = [
    {
        ID: IDS.KOMBINATNA25A_4_SECTION,
        NAME: 'kombinatna25a_4_section',
        REGION: REGION.KYIV,
        GROUP: 5,
        MONITORS: [
            MONITORS_MAP.ESP_32_25A_4_SECTION,
        ],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001307846114', message_thread_id: 45691},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло (Лінія 1)',
            UNAVAILABLE: '⚫️ Зникло світло (Лінія 1)',
        },
    },
    {
        ID: IDS.KOMNINATNA_25_A_ESP32,
        NAME: 'kombinatna25',
        REGION: REGION.KYIV,
        GROUP: 5,
        MONITORS: [
            MONITORS_MAP.KOMNINATNA_25_A_ESP32,
        ],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_alerts'},
            {chat_id: '-1001811166479', message_thread_id: 567},
        ],
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло (Лінія 2)',
            UNAVAILABLE: '⚫️ Зникло світло (Лінія 2)',
        },
    },
    {
        ID: IDS.SADOVA_49A,
        NAME: 'sadova49a',
        REGION: REGION.KYIV,
        GROUP: '1.1',
        MONITORS: [MONITORS_MAP.SADOVA_49A],
        TELEGRAM_CHATS: [
            {chat_id: '@sadova_alerts'},
        ],
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
];

export const MONITORS_CONFIG_DEV: BotConfigType[] = [
    ...MONITORS_CONFIG,
];
