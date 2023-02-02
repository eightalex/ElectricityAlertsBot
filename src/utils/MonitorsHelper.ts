import {PreparedCheckResultType} from '../../types/PreparedCheckResultType';

export class MonitorsHelper {
    static getCheckResult(id: number, checkResult: PreparedCheckResultType[]): PreparedCheckResultType {
        const result = checkResult.filter(check => check.id === id)[0];

        if (result === undefined) {
            throw new Error('Undefined check result');
        }

        return result;
    }
}
