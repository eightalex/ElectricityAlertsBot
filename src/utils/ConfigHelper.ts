import {HouseConfigType} from '../../types/AppConfigType';
import {APP_CONFIG} from '../constants/appConfig';

export class ConfigHelper {
    static getConfig(id: number): HouseConfigType {
        const houseConfig = APP_CONFIG.filter(houseConfig => houseConfig.ID === id)[0];

        if (houseConfig === undefined) {
            throw new Error('Undefined house config');
        }

        return houseConfig;
    }
}
