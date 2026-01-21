import {STRING} from '../../constants/string';
import {TimeDifferenceGeneratorInterface} from '../TimeDifferenceGenerator';
import {PingOptions} from '../Pinger';

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
            ].join(STRING.EMPTY);
        }

        return [
            message,
            STRING.PARAGRAPH,
            this.easterEgg() + ' було наявне',
            STRING.NEWLINE,
            this.timeDifferenceGenerator.generate(lastTime, pingOptions.nowDate),
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

}
