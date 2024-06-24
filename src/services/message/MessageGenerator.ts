import {STRING} from '../../constants/string';
import {TimeDifferenceGeneratorInterface} from '../TimeDifferenceGenerator';
import {PingOptions} from '../Pinger';
import {YasnoInterface} from '../Yasno';
import {BotConfigType} from '../../../types/BotConfigType';

type GenerateArgumentsType = {
    isAvailable: boolean
    lastTime: string
    pingOptions: PingOptions
}

export interface MessageGeneratorInterface {
    generate(options: GenerateArgumentsType): string
}

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(
        private timeDifferenceGenerator: TimeDifferenceGeneratorInterface,
        private yasno: YasnoInterface,
    ) {}

    generate({isAvailable, lastTime, pingOptions}: GenerateArgumentsType): string {
        const message = isAvailable ? this.getAvailableMessage(pingOptions) : this.getUnavailableMessage(pingOptions);

        if (lastTime === '0') {
            return message;
        }

        if (isAvailable) {
            return [
                message,
                STRING.PARAGRAPH,
                'Відключення тривало',
                STRING.NEWLINE,
                this.timeDifferenceGenerator.generate(lastTime, pingOptions.nowDate),
                this.getNextOutageMessage(pingOptions.config, 'start'),
            ].join(STRING.EMPTY);
        }

        return [
            message,
            STRING.PARAGRAPH,
            this.easterEgg() + ' було наявне',
            STRING.NEWLINE,
            this.timeDifferenceGenerator.generate(lastTime, pingOptions.nowDate),
            this.getNextOutageMessage(pingOptions.config, 'end'),
        ].join(STRING.EMPTY);
    }

    /**
     * Post surprise word with 20% chance
     */
    private easterEgg(): string {
        const randomNumber = Math.round(Math.random() * 10);
        return randomNumber === 0 || randomNumber === 1 ? 'Електрохарчування' : 'Електропостачання';
    }

    private getAvailableMessage(options: PingOptions): string {
        if (options.config.MESSAGE && options.config.MESSAGE.AVAILABLE) {
            return options.config.MESSAGE.AVAILABLE;
        }

        return '🟢 З\'явилось світло';
    }

    private getUnavailableMessage(options: PingOptions): string {
        if (options.config.MESSAGE && options.config.MESSAGE.UNAVAILABLE) {
            return options.config.MESSAGE.UNAVAILABLE;
        }

        return '⚫️ Зникло світло';
    }

    private getNextOutageMessage(config: BotConfigType, type: 'start' | 'end'): string {
        if (config === undefined) {
            return '';
        }

        if (config.REGION === undefined || config.GROUP === undefined) {
            return '';
        }

        let result = STRING.PARAGRAPH;

        if (type === 'start') {
            result += 'Наступне відключення о ';
        } else {
            result += 'Має бути відновлено о ';
        }

        const outage = this.yasno.getNextOutage({
            region: config.REGION,
            group: config.GROUP,
            type: type,
        });

        if (outage === null) {
            return '';
        }

        const hours = outage[type].toString().padStart(2, '0');

        return result + `${hours}:00`;
    }
}
