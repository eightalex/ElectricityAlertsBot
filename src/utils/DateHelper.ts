export interface DateHelperInterface {
    getDifference(dateFirst: Date, dateSecond: Date): number
    getTimeString(date: Date): string
}

export class DateHelper implements DateHelperInterface {
    getDifference(dateFirst: Date, dateSecond: Date): number {
        return Math.abs(dateFirst.valueOf() - dateSecond.valueOf());
    }

    getTimeString(date: Date): string {
        return new Date(date).toISOString().substring(11, 19);
    }
}
