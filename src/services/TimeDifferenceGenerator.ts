import {DateHelperInterface} from '../utils/DateHelper';

export interface TimeDifferenceGeneratorInterface {
    generate(lastTime: string, nowDate: Date): string
}

export class TimeDifferenceGenerator implements TimeDifferenceGeneratorInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    generate(lastTime: string, nowDate: Date): string {
        const lastDate = new Date(Number(lastTime));
        const difference = this.dateHelper.getDifference(nowDate, lastDate);
        const preparedDifference = new Date(difference);

        return this.dateHelper.getPluralizedTimeString(preparedDifference);
    }
}
