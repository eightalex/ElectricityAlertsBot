import {DateHelperInterface} from '../utils/DateHelper';
import {StringHelperInterface} from '../utils/StringHelper';
import {STRING} from '../constants/string';
import {PLURAL_CONFIG} from '../constants/pluralConfig';

export interface TimeStringGeneratorInterface {
    generate(lastTime: string, nowDate: Date): string
}

export class TimeStringGenerator implements TimeStringGeneratorInterface {
    constructor(
        private dateHelper: DateHelperInterface,
        private stringHelper: StringHelperInterface,
    ) {}

    generate(lastTime: string, nowDate: Date): string {
        const {pluralize} = this.stringHelper;
        const lastDate = new Date(Number(lastTime));
        const difference = this.dateHelper.getDifference(nowDate, lastDate);
        const preparedDifference = new Date(difference);
        const hours = preparedDifference.getUTCHours();
        const minutes = preparedDifference.getUTCMinutes();
        const hasHours = hours > 0;

        return [
            ...hasHours ? [hours] : [],
            ...hasHours ? [pluralize(hours, PLURAL_CONFIG.HOURS)] : [],
            minutes,
            pluralize(minutes, PLURAL_CONFIG.MINUTES),
        ].join(STRING.SPACE);
    }
}
