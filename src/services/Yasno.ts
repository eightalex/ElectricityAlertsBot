import {Outage, RegionType, YasnoResponse} from '../../types/YasnoType';
import {Component, ScheduleComponent} from '../../types/YasnoType';

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

export interface YasnoInterface {
    getSchedule(options: getScheduleOptions): Outage[] | null
    checkFutureOutage({region, group, minutes}: checkFutureOutageOptions): boolean
}

const templateName = {
    editor: 'editor',
    schedule: 'electricity-outages-schedule',
    faq: 'FrequentlyAskedQuestions',
};

export class Yasno implements YasnoInterface {
    private url = 'https://api.yasno.com.ua/api/v1/pages/home/schedule-turn-off-electricity';

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
        const response = this.fetchData();
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
        const nowDay = now.getDay() - 1 === -1 ? 6 : now.getDay() - 1;
        const schedule = this.getSchedule({region, group, day: nowDay});
        const hours = nowHour + 1 > 23 ? 0 : nowHour + 1;

        if (schedule === null) {
            return false;
        }

        const outage = schedule.find(outage => {
            return outage.start === hours && nowMinute === minutes;
        });

        return outage !== undefined;
    }
}
