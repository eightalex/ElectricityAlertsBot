import {STRING} from '../../constants/string';
import {Outage} from '../../../types/YasnoType';

export interface ScheduleGeneratorInterface {
    generate(schedule: Outage[]): string
}

export class ScheduleGenerator implements ScheduleGeneratorInterface {
    generate(schedule: Outage[]): string {
        const header = '🗓️ Можливі відключення завтра:' + STRING.PARAGRAPH;

        const result = schedule.filter(outage => outage.type === 'DEFINITE_OUTAGE').map(outage => {
            const startHour = outage.start.toString().padStart(2, '0');
            const endHour = outage.end.toString().padStart(2, '0');

            return `${startHour}:00 – ${endHour}:00`;
        }).join(STRING.NEWLINE);

        if (result === '') {
            return '🗓️ На завтра відключень не передбачено';
        }

        return header + result;
    }
}
