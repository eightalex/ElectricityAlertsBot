import {TimeDifferenceGeneratorInterface} from './TimeDifferenceGenerator';

type GenerateArgumentsType = {
    isAvailable: boolean
    lastTime: string
}

export interface MessageGeneratorInterface {
    generate(options: GenerateArgumentsType): string
}

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(
        private timeDifferenceGenerator: TimeDifferenceGeneratorInterface,
    ) {}

    generate({isAvailable, lastTime}: GenerateArgumentsType): string {
        const message = isAvailable ? '🟢 З\'явилось світло' : '⚫️ Зникло світло';
        const nowDate = new Date();

        if (lastTime === '0') {
            return message;
        }

        if (isAvailable) {
            return message + '\n\nВідключення тривало\n' + this.timeDifferenceGenerator.generate(lastTime, nowDate);
        }

        return message + '\n\nЕлектропостачання було наявне\n' + this.timeDifferenceGenerator.generate(lastTime, nowDate);
    }
}
