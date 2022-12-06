import {MESSAGE} from '../constants/message';
import {TimeStringGeneratorInterface} from './TimeStringGenerator';

type GenerateArgumentsType = {
    isAvailable: boolean
    lastTime: string | null
    nowDate: Date
}

export interface MessageGeneratorInterface {
    generate(options: GenerateArgumentsType): string
}

export class MessageGenerator implements MessageGeneratorInterface {
    constructor(
        private timeStringGenerator: TimeStringGeneratorInterface,
    ) {}

    generate({isAvailable, lastTime, nowDate}: GenerateArgumentsType): string {
        const message = isAvailable ? MESSAGE.APPEARED : MESSAGE.DISAPPEARED;

        if (lastTime === null) {
            return message;
        }

        if (isAvailable) {
            return message + MESSAGE.WAS_ABSENT + this.timeStringGenerator.generate(lastTime, nowDate);
        }

        return message + MESSAGE.WAS_AVAILABLE + this.timeStringGenerator.generate(lastTime, nowDate);
    }
}
