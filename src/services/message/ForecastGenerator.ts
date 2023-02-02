export interface ForecastGeneratorInterface {
    generate(status: boolean, dependencyStatus: boolean): string | null
}

export class ForecastGenerator implements ForecastGeneratorInterface {
    generate(status: boolean, dependencyStatus: boolean): string | null {
        if (!dependencyStatus && status) {
            return '🪄 Є ймовірність відключення найближчим часом';
        }

        if (dependencyStatus && !status) {
            return '💫 Є ймовірність, що світло скоро з\'явиться';
        }

        return null;
    }
}
