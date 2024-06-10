import {BotConfigType} from '../../types/BotConfigType';

const MONITORS_MAP = {
    UNDERNET_25A_2_SECTION: 793214785,
    BOILER_SOCKET_4_SECTION: 793535128,
};

export const MONITORS_CONFIG: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a',
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
    },
];

export const MONITORS_CONFIG_DEV: BotConfigType[] = [
    {
        ID: 1,
        NAME: 'kombinatna25a_2_section',
        MONITORS: [MONITORS_MAP.UNDERNET_25A_2_SECTION],
        TELEGRAM_CHATS: [
            {chat_id: '@kombinatna_test_alerts'},
        ],
        STATISTICS: {
            INFORM_TIME: '23:58',
        },
        MESSAGE: {
            AVAILABLE: '🟢 З\'явилось світло в 2 секції',
            UNAVAILABLE: '⚫️ Зникло світло в 2 секції',
        },
    },
    {
        ID: 2,
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
