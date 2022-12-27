import {PLURAL_CONFIG} from '../constants/pluralConfig';
import {STRING} from '../constants/string';
import {TIME} from '../constants/time';
import {StringHelperInterface} from './StringHelper';

export interface DateHelperInterface {
    getDifference(dateFirst: Date, dateSecond: Date): number
    getTimeString(date: Date): string
    getDateString(date: Date): string
    getPluralizedTimeString(date: Date): string
    parseIcsDate(date: string): Date
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
        return [
            ('0' + date.getHours()).slice(-2),
            ('0' + date.getMinutes()).slice(-2),
        ].join(STRING.COLON);
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

    parseIcsDate(date: string): Date {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const hours = date.substring(9, 11);
        const minutes = date.substring(11, 13);
        const seconds = date.substring(13, 15);

        return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
    }
}
