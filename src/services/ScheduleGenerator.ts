import {CalendarEventType} from '../../types/CalendarEventType';
import {STRING} from '../constants/string';
import {DateHelperInterface} from '../utils/DateHelper';

export interface ScheduleGeneratorInterface {
    generate(events: CalendarEventType[]): string
}

export class ScheduleGenerator implements ScheduleGeneratorInterface {
    constructor(
        private dateHelper: DateHelperInterface,
    ) {}

    generate(events: CalendarEventType[]): string {
        let divider = false;

        if (events.length === 0) {
            return '';
        }

        const preparedEvents = events.map(event => {
            let intervalString = this.dateHelper.getTimeString(event.start) + ' – ' + this.dateHelper.getTimeString(event.end);

            if (!divider && event.start.getDate() === this.dateHelper.addDays(new Date(), 1).getDate()) {
                intervalString = STRING.NEWLINE + 'Та завтра' + STRING.NEWLINE + intervalString;
                divider = true;
            }

            return intervalString
        }).join(STRING.NEWLINE);

        return [
            '🗓️ Відключення сьогодні',
            preparedEvents,
            '(За графіком від ДТЕК)',
        ].join(STRING.PARAGRAPH);
    }
}
