export interface TelegramServiceInterface {
    sendMessage(message: string): void
}

export class TelegramService implements TelegramServiceInterface {
    sendMessage(message: string) {
        UrlFetchApp.fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_API_KEY}/sendMessage`, {
            method: 'post',
            payload: {
                chat_id: process.env.TELEGRAM_CHAT,
                text: message,
            }
        });
    }
}
