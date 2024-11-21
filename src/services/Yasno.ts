import {Outage, RegionType} from '../../types/YasnoType';
import {TIME_IN_SECONDS} from '../constants/time';

type baseOptions = {
    region: RegionType
    group: number
}

type DayType = 'today' | 'tomorrow';

type getScheduleOptions = baseOptions & {
    day: DayType
}

type checkFutureOutageOptions = baseOptions & {
    minutes: number
}

type getNextOutageOptions = baseOptions & {
    type: 'start' | 'end'
}

export interface YasnoInterface {
    getSchedule(options: getScheduleOptions): Outage[] | null
    checkFutureOutage(options: checkFutureOutageOptions): boolean
    getNextOutage(options: getNextOutageOptions): Outage | null
}

interface DailyScheduleData {
    [region: string]: {
        [day in DayType]?: {
            groups: {
                [groupKey: string]: Outage[]
            }
        }
    }
}

export class Yasno implements YasnoInterface {
    private url = 'https://api.yasno.com.ua/api/v1/pages/home/schedule-turn-off-electricity';

    private getData(): DailyScheduleData {
        const cache = CacheService.getScriptCache();
        const cachedData = cache.get('yasno');

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const data = this.fetchData();

        const scheduleComponent = data.components.find(
            (component: any) => component.template_name === 'electricity-outages-schedule'
        );

        if (!scheduleComponent?.dailySchedule) {
            throw new Error('Не вдалося отримати dailySchedule з даних');
        }

        const dailySchedule = scheduleComponent.dailySchedule;

        cache.put('yasno', JSON.stringify(dailySchedule), TIME_IN_SECONDS.HOUR);

        return dailySchedule;
    }

    private fetchData() {
        const result = UrlFetchApp.fetch(this.url, {
            method: 'get',
        });

        return JSON.parse(result.getContentText());
    }

    private mergeConsecutiveOutages(outages: Outage[]): Outage[] {
        if (outages.length === 0) {
            return [];
        }

        const sortedOutages = outages.slice().sort((a, b) => a.start - b.start);
        const mergedOutages: Outage[] = [];

        let currentOutage = { ...sortedOutages[0] };

        for (let i = 1; i < sortedOutages.length; i++) {
            const nextOutage = sortedOutages[i];

            if (nextOutage === undefined) {
                break;
            }

            if (
                nextOutage.type === currentOutage.type &&
                nextOutage.start === currentOutage.end
            ) {
                currentOutage.end = nextOutage.end;
            } else {
                // @ts-ignore
                mergedOutages.push(currentOutage);
                currentOutage = { ...nextOutage };
            }
        }

        // @ts-ignore
        mergedOutages.push(currentOutage);

        return mergedOutages;
    }

    clearCache() {
        const cache = CacheService.getScriptCache();
        cache.remove('yasno');
    }

    getSchedule({ region, group, day }: getScheduleOptions): Outage[] | null {
        const data = this.getData();

        const regionData = data[region];
        if (!regionData) {
            return null;
        }

        const dayData = regionData[day];
        if (!dayData || !dayData.groups) {
            return null;
        }

        const groupKey = group.toString();
        const scheduleGroup = dayData.groups[groupKey];
        if (!scheduleGroup) {
            return null;
        }

        return this.mergeConsecutiveOutages(scheduleGroup);
    }

    checkFutureOutage({ region, group, minutes }: checkFutureOutageOptions): boolean {
        const now = new Date();
        let nowHour = now.getHours();
        const nowMinute = now.getMinutes();

        let day: DayType = 'today';

        if (nowHour >= 23) {
            nowHour = 0;
            day = 'tomorrow';
        } else {
            nowHour += 1;
        }

        const schedule = this.getSchedule({ region, group, day });

        if (!schedule) {
            return false;
        }

        return schedule.some(
            (outage) =>
                outage.type === 'DEFINITE_OUTAGE' &&
                outage.start === nowHour &&
                nowMinute === minutes
        );
    }

    getNextOutage({ region, group, type }: getNextOutageOptions): Outage | null {
        const now = new Date();
        const nowHour = now.getHours();

        let day: DayType = 'today';
        if (nowHour >= 23) {
            day = 'tomorrow';
        }

        const schedule = this.getSchedule({ region, group, day });

        if (!schedule) {
            return null;
        }

        return (
            schedule.find(
                (outage) => outage.type === 'DEFINITE_OUTAGE' && nowHour < outage[type]
            ) || null
        );
    }
}
