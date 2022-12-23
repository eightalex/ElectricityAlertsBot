import {MESSAGE} from '../constants/message';
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
        const message = isAvailable ? MESSAGE.APPEARED : MESSAGE.DISAPPEARED;
        const nowDate = new Date();

        if (lastTime === '0') {
            return message;
        }

        if (isAvailable) {
            return message + MESSAGE.WAS_ABSENT + this.timeDifferenceGenerator.generate(lastTime, nowDate);
        }

        return message + MESSAGE.WAS_AVAILABLE + this.timeDifferenceGenerator.generate(lastTime, nowDate);
    }
}
