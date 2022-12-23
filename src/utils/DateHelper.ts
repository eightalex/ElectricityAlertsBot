import {PLURAL_CONFIG} from '../constants/pluralConfig';
import {STRING} from '../constants/string';
import {TIME} from '../constants/time';
import {StringHelperInterface} from './StringHelper';

export interface DateHelperInterface {
    getDifference(dateFirst: Date, dateSecond: Date): number
    getTimeString(date: Date): string
    getDateString(date: Date): string
    getPluralizedTimeString(date: Date): string
}

export class DateHelper implements DateHelperInterface {
    constructor(
        private stringHelper: StringHelperInterface,
    ) {}

    getDifference(dateFirst: Date, dateSecond: Date): number {
        return Math.abs(dateFirst.valueOf() - dateSecond.valueOf());
    }

    /**
     * Returns string like '11:56'
     */
    getTimeString(date: Date): string {
        return new Date(date).toISOString().substring(11, 16);
    }

    getDateString(date: Date): string {
        const gap = 1;
        return date.getDate() + STRING.SLASH + (date.getMonth() + gap) + STRING.SLASH + date.getFullYear();
    }

    getPluralizedTimeString(date: Date): string {
        const {pluralize} = this.stringHelper;
        const hours = Math.floor(date.getTime() / TIME.HOUR);
        const minutes = date.getUTCMinutes();
        const hasHours = hours > 0;

        return [
            ...hasHours ? [hours] : [],
            ...hasHours ? [pluralize(hours, PLURAL_CONFIG.HOURS)] : [],
            minutes,
            pluralize(minutes, PLURAL_CONFIG.MINUTES),
        ].join(STRING.SPACE);
    }
}
