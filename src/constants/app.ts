export const APP = {
    MODE: process.env.MODE || 'production',
    UPTIME_ROBOT: {
        API_KEY: process.env.UPTIME_ROBOT_API_KEY || '',
    },
    TELEGRAM: {
        API_KEY: process.env.TELEGRAM_API_KEY || '',
    },
};
