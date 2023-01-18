const ITEM_DIVIDER = ',';
const PAIR_DIVIDER = ':';

export interface MonitorsConfigGeneratorInterface {
    generate(config: string | undefined): Record<string, number>
}

export class MonitorsConfigGenerator implements MonitorsConfigGeneratorInterface {
    generate(config: string | undefined): Record<string, number> {
        if (config === undefined) {
            throw new Error('Undefined monitors config');
        }

        if (config.indexOf(PAIR_DIVIDER) === -1) {
            throw new Error('Incorrect monitors config');
        }

        return Object.fromEntries(
            config
                .split(ITEM_DIVIDER)
                .map(pair => pair.split(PAIR_DIVIDER))
        );
    }
}
