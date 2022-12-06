import {DateHelperInterface} from '../utils/DateHelper';

export interface TimeStringGeneratorInterface {
    generate(lastTime: string, nowDate: Date): string
}

export class TimeStringGenerator implements TimeStringGeneratorInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    generate(lastTime: string, nowDate: Date): string {
        const lastDate = new Date(Number(lastTime));
        const difference = this.dateHelper.getDifference(nowDate, lastDate);
        const preparedDifference = new Date(difference)

        return this.dateHelper.getTimeString(preparedDifference);
    }
}
