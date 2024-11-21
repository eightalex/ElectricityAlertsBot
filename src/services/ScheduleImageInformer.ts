import {BotConfigType} from '../../types/BotConfigType';
import {ConcreteInformerInterface} from './Informer';
import {TelegramServiceInterface} from './TelegramService';
import {YasnoInterface} from './Yasno';
import {HctiServiceInterface} from './HctiService';
import {ScheduleImageInterface} from './schedule/ScheduleImage';
import {ScheduleGeneratorInterface} from './message/ScheduleGenerator';

export class ScheduleImageInformer implements ConcreteInformerInterface {
    constructor(
        private scheduleImage: ScheduleImageInterface,
        private hctiService: HctiServiceInterface,
        private telegramService: TelegramServiceInterface,
        private yasno: YasnoInterface,
        private scheduleGenerator: ScheduleGeneratorInterface,
    ) {}

    inform(config: BotConfigType) {
        if (config.REGION === undefined || config.GROUP === undefined) {
            throw new Error('ScheduleInformer: Undefined config');
        }

        const schedule = this.yasno.getSchedule({
            region: config.REGION,
            group: config.GROUP,
            day: 'tomorrow',
        });

        if (schedule === null) {
            return;
        }

        const svg = this.scheduleImage.createTimelineSVG(schedule);
        const photo = this.hctiService.convertSvgToPng(svg);
        const caption = this.scheduleGenerator.generate(schedule);

        this.telegramService.sendPhotos({
            photo,
            caption,
        }, config.TELEGRAM_CHATS);
    }
}
