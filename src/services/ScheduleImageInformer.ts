import {BotConfigType} from '../../types/BotConfigType';
import {DateHelper} from '../utils/DateHelper';
import {ConcreteInformerInterface} from './Informer';
import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';
import {HctiServiceInterface} from './HctiService';
import {ScheduleImageInterface} from './schedule/ScheduleImage';

export class ScheduleImageInformer implements ConcreteInformerInterface {
    constructor(
        private scheduleImage: ScheduleImageInterface,
        private hctiService: HctiServiceInterface,
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.REGION === undefined || config.GROUP === undefined) {
            throw new Error('ScheduleInformer: Undefined config');
        }

        /**
         * We receive 1 for Monday, 2 for Tuesday, etc. And 0 for Sunday
         * It's correct, because we need to get the schedule for the next day
         */
        const date = new Date();
        const tomorrow = DateHelper.addDays(date, 1);

        const schedule = this.yasno.getSchedule({
            region: config.REGION,
            group: config.GROUP,
            day: date.getDay(),
        });

        if (schedule === null) {
            return;
        }

        const svg = this.scheduleImage.createSingleDayScheduleSVG(schedule);
        const photo = this.hctiService.convertSvgToPng(svg);
        const tomorrowDate = DateHelper.getDateStringV2(tomorrow);

        this.telegramService.sendPhotos({
            photo,
            caption: `Розклад на завтра (${tomorrowDate})`,
        }, config.TELEGRAM_CHATS);
    }
}
