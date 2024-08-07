import {PLURAL_CONFIG} from '../constants/pluralConfig';
import {STRING} from '../constants/string';
import {TIME} from '../constants/time';
import {StringHelper} from './StringHelper';

export type TimeStringNumbers = {
    hours: number
    minutes: number
}

export type GetUpdatedDateOptionsType = {
    date?: number
    hours?: number
    minutes?: number
    seconds?: number
}

export class DateHelper {
    static getDifference(dateFirst: Date, dateSecond: Date): number {
        return Math.abs(dateFirst.valueOf() - dateSecond.valueOf());
    }

    /**
     * Returns string like '11:56'
     */
    static getTimeString(date: Date): string {
        return [
            ('0' + date.getHours()).slice(-2),
            ('0' + date.getMinutes()).slice(-2),
        ].join(STRING.COLON);
    }

    static getDateString(date: Date): string {
        const gap = 1;
        return date.getDate() + STRING.SLASH + (date.getMonth() + gap) + STRING.SLASH + date.getFullYear();
    }

    /**
     * Returns string like '31.12.2024'
     */
    static getDateStringV2(date: Date): string {
        return [
            ('0' + date.getDate()).slice(-2),
            ('0' + (date.getMonth() + 1)).slice(-2),
            date.getFullYear(),
        ].join(STRING.DOT);
    }

    static getTimeFromTimeString(timeString: string): TimeStringNumbers {
        const times = timeString.split(STRING.COLON);

        return {
            hours: times[0] ? parseInt(times[0], 10) : 0,
            minutes: times[1] ? parseInt(times[1], 10) : 0,
        };
    }

    static getUpdatedDate(input: Date, options: GetUpdatedDateOptionsType): Date {
        const updatedDate = new Date(input);

        if (options.date !== undefined) {
            updatedDate.setDate(options.date);
        }

        updatedDate.setHours(
            options.hours || 0,
            options.minutes || 0,
            options.seconds || 0,
        );

        return updatedDate;
    }

    static getPluralizedTimeString(date: Date): string {
        const hours = Math.floor(date.getTime() / TIME.HOUR);
        const minutes = date.getUTCMinutes();
        const hasHours = hours > 0;

        return [
            ...hasHours ? [hours] : [],
            ...hasHours ? [StringHelper.pluralize(hours, PLURAL_CONFIG.HOURS)] : [],
            minutes,
            StringHelper.pluralize(minutes, PLURAL_CONFIG.MINUTES),
        ].join(STRING.SPACE);
    }

    static addDays(date: Date, days: number): Date {
        const ms = date.getTime() + (TIME.DAY * days);
        return new Date(ms);
    }
}
