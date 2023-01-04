import {STRING} from '../constants/string';
import {TimeDifferenceGeneratorInterface} from './TimeDifferenceGenerator';

type GenerateArgumentsType = {
    isAvailable: boolean
    lastTime: string
    nowDate: Date
}

export interface MessageGeneratorInterface {
    generate(options: GenerateArgumentsType): string
}

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(
        private timeDifferenceGenerator: TimeDifferenceGeneratorInterface,
    ) {}

    generate({isAvailable, lastTime, nowDate}: GenerateArgumentsType): string {
        const message = isAvailable ? '🟢 З\'явилось світло' : '⚫️ Зникло світло';

        if (lastTime === '0') {
            return message;
        }

        if (isAvailable) {
            return [
                message,
                STRING.PARAGRAPH,
                'Відключення тривало',
                STRING.NEWLINE,
                this.timeDifferenceGenerator.generate(lastTime, nowDate),
            ].join(STRING.EMPTY);
        }

        return [
            message,
            STRING.PARAGRAPH,
            'Електропостачання було наявне',
            STRING.NEWLINE,
            this.timeDifferenceGenerator.generate(lastTime, nowDate),
        ].join(STRING.EMPTY);
    }
}
