import {DateHelper} from '../utils/DateHelper';

export interface TimeDifferenceGeneratorInterface {
    generate(lastTime: string, nowDate: Date): string
}

export class TimeDifferenceGenerator implements TimeDifferenceGeneratorInterface {
    generate(lastTime: string, nowDate: Date): string {
        const lastDate = new Date(Number(lastTime));
        const difference = DateHelper.getDifference(nowDate, lastDate);
        const preparedDifference = new Date(difference);

        return DateHelper.getPluralizedTimeString(preparedDifference);
    }
}
