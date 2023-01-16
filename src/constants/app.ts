import {MessageConfigParser} from '../services/message/MessageConfigParser';

export const APP = {
    MESSAGE_CONFIG: new MessageConfigParser().parse(process.env.TELEGRAM_CHATS || ''),
    SCHEDULE: {
        IS_ENABLED: process.env.SCHEDULE_ENABLED === '1',
    },
    STATISTICS: {
        IS_ENABLED: process.env.STATISTICS_ENABLED === '1',
    },
};
