import {Outage, RegionType, YasnoResponse} from '../../types/YasnoType';
import {Component, ScheduleComponent} from '../../types/YasnoType';
import {TIME_IN_SECONDS} from '../constants/time';

type baseOptions = {
    region: RegionType
    group: number
}

type getScheduleOptions = baseOptions & {
    day: number
}

type checkFutureOutageOptions = baseOptions & {
    minutes: number
}

type getNextOutageOptions = baseOptions & {
    type: 'start' | 'end'
}

export interface YasnoInterface {
    getSchedule(options: getScheduleOptions): Outage[] | null
    checkFutureOutage({region, group, minutes}: checkFutureOutageOptions): boolean
    getNextOutage({region, group, type}: getNextOutageOptions): Outage | null
}

const templateName = {
    editor: 'editor',
    schedule: 'electricity-outages-schedule',
    faq: 'FrequentlyAskedQuestions',
};

export class Yasno implements YasnoInterface {
    private url = 'https://api.yasno.com.ua/api/v1/pages/home/schedule-turn-off-electricity';

    private getData(): YasnoResponse {
        const cache = CacheService.getScriptCache();
        const cachedData = cache.get('yasno');

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const data = this.fetchData();

        cache.put('yasno', JSON.stringify(data), TIME_IN_SECONDS.HOUR);

        return data;
    }

    private fetchData(): YasnoResponse {
        const result = UrlFetchApp.fetch(this.url, {
            method: 'get',
        });

        return JSON.parse(result.getContentText());
    }

    private isScheduleComponent(component: Component): component is ScheduleComponent {
        return component.template_name === templateName.schedule;
    }

    /**
     * Get schedule for the specified region, group and day
     * @param region
     * @param group
     * @param day – 0 for Monday, 1 for Tuesday, etc.
     */
    getSchedule({region, group, day}: getScheduleOptions): Outage[] | null {
        const response = this.getData();
        const scheduleComponent = response.components.find(this.isScheduleComponent);

        if (!scheduleComponent || !scheduleComponent.available_regions.includes(region)) {
            return null;
        }

        const scheduleRegion = scheduleComponent.schedule[region]

        if (scheduleComponent.schedule[region] === undefined) {
            return null;
        }

        const scheduleGroup = scheduleRegion[`group_${group}`];

        if (scheduleGroup === undefined) {
            return null;
        }

        const scheduleDay = scheduleGroup[day];

        if (scheduleDay === undefined) {
            return null;
        }

        return scheduleDay;
    }

    checkFutureOutage({region, group, minutes}: checkFutureOutageOptions): boolean {
        const now = new Date();
        const nowHour = now.getHours();
        const nowMinute = now.getMinutes();
        const nowDay = (now.getDay() + 6) % 7;
        const schedule = this.getSchedule({region, group, day: nowDay});
        const hours = nowHour + 1; // > 23 ? 0 : nowHour + 1; // TODO: handle next day

        if (schedule === null) {
            return false;
        }

        const outage = schedule.find(outage => {
            return outage.type === 'DEFINITE_OUTAGE' && outage.start === hours && nowMinute === minutes;
        });

        return outage !== undefined;
    }

    getNextOutage({region, group, type}: getNextOutageOptions): Outage | null {
        const now = new Date();
        const nowHour = now.getHours();
        const nowDay = (now.getDay() + 6) % 7;
        const schedule = this.getSchedule({region, group, day: nowDay});

        return schedule?.find(outage => outage.type === 'DEFINITE_OUTAGE' && nowHour < outage[type]) || null;
    }
}
