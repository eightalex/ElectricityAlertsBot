export const APP = {
    MODE: process.env.MODE || 'production',
    UPTIME_ROBOT: {
        API_KEY: process.env.UPTIME_ROBOT_API_KEY || '',
    },
    TELEGRAM: {
        API_KEY: process.env.TELEGRAM_API_KEY || '',
    },
    HCTI: {
        API_KEY: process.env.HCTI_API_KEY || '',
        USER_ID: process.env.HCTI_USER_ID || '',
    },
};
