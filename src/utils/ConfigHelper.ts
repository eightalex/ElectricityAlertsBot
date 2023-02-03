import {BotConfigType} from '../../types/BotConfigType';

export class ConfigHelper {
    static getConfig(id: number, config: BotConfigType[]): BotConfigType {
        const houseConfig = config.filter(houseConfig => houseConfig.ID === id)[0];

        if (houseConfig === undefined) {
            throw new Error('Undefined house config');
        }

        return houseConfig;
    }
}
