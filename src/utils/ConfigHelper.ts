import {MonitorsConfigType, HouseConfigType} from '../../types/MonitorsConfigType';

export class ConfigHelper {
    static getConfig(id: number, config: MonitorsConfigType): HouseConfigType {
        const houseConfig = config.filter(houseConfig => houseConfig.ID === id)[0];

        if (houseConfig === undefined) {
            throw new Error('Undefined house config');
        }

        return houseConfig;
    }
}
