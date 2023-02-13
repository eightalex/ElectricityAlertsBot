import {BotConfigType} from '../../types/BotConfigType';

export class ConfigHelper {
    static getConfig(id: number, config: BotConfigType[]): BotConfigType {
        const botConfig = config.filter(botConfig => botConfig.ID === id)[0];

        if (botConfig === undefined) {
            throw new Error('Undefined bot config');
        }

        return botConfig;
    }

    static getHeartbeatConfigs(config: BotConfigType[]): BotConfigType[] {
        return config.filter(botConfig => botConfig.HEARTBEAT);
    }
}
