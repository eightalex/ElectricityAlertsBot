import {StatisticsPeriod, StatisticsType} from '../../../types/StatisticsType';
import {StatisticsBuilderInterface} from './StatisticsBuilder';
import {BotConfigType} from '../../../types/BotConfigType';
import {APP} from '../../constants/app';

type UpdateOptions = {
    config: BotConfigType
    nowDate: Date
    period?: StatisticsPeriod
}

export interface StatisticsServiceInterface {
    build(options: UpdateOptions): StatisticsType
}

export class StatisticsService implements StatisticsServiceInterface {
    constructor(
        private statisticsBuilder: StatisticsBuilderInterface,
    ) {
    }

    build({config, nowDate, period}: UpdateOptions): StatisticsType {
        const statsPeriod = period ?? 'day';
        const {start, end} = this.getPeriodRange(statsPeriod, nowDate);
        const monitorIds = config.MONITORS ?? [];

        if (monitorIds.length === 0) {
            return this.statisticsBuilder.build({
                period: statsPeriod,
                start,
                end,
                downtimeMs: 0,
                incidents: 0,
            });
        }

        let combinedIntervals: Interval[] | null = null;

        monitorIds.forEach(monitorId => {
            const monitorIncidents = this.fetchIncidents(monitorId, start, end);
            const intervals = this.buildIntervals(monitorIncidents, start, end);
            const mergedIntervals = this.mergeIntervals(intervals);

            if (combinedIntervals === null) {
                combinedIntervals = mergedIntervals;
                return;
            }

            combinedIntervals = this.intersectIntervals(combinedIntervals, mergedIntervals);
        });

        const finalIntervals = combinedIntervals ?? [];
        const downtimeMs = finalIntervals.reduce((sum, interval) => sum + (interval.end - interval.start), 0);
        const incidents = finalIntervals.length;

        return this.statisticsBuilder.build({
            period: statsPeriod,
            start,
            end,
            downtimeMs,
            incidents,
        });
    }

    private getPeriodRange(period: StatisticsPeriod, nowDate: Date): {start: Date; end: Date} {
        const start = new Date(nowDate);
        const end = new Date(nowDate);

        if (period === 'month') {
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(end.getMonth() + 1, 0);
            end.setHours(23, 59, 59, 999);
            return {start, end};
        }

        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        return {start, end};
    }

    private fetchIncidents(monitorId: number, start: Date, end: Date): IncidentType[] {
        const baseUrl = 'https://api.uptimerobot.com/v3/incidents';
        const query = this.buildQuery({
            monitor_id: monitorId,
            started_after: start.toISOString(),
            started_before: end.toISOString(),
        });

        let url = `${baseUrl}?${query}`;
        const incidents: IncidentType[] = [];

        while (url) {
            const response = UrlFetchApp.fetch(url, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${APP.UPTIME_ROBOT.API_KEY}`,
                },
            });

            const payload = JSON.parse(response.getContentText()) as IncidentsResponseType;
            incidents.push(...(payload.data ?? []));
            url = payload.nextLink ?? '';
        }

        return incidents;
    }

    private buildQuery(params: Record<string, string | number>): string {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
            .join('&');
    }

    private buildIntervals(incidents: IncidentType[], start: Date, end: Date): Interval[] {
        return incidents.reduce<Interval[]>((result, incident) => {
            if (!incident.startedAt) {
                return result;
            }

            const incidentStart = new Date(incident.startedAt);
            const incidentEnd = incident.resolvedAt ? new Date(incident.resolvedAt) : end;

            const effectiveStart = incidentStart > start ? incidentStart : start;
            const effectiveEnd = incidentEnd < end ? incidentEnd : end;

            if (effectiveEnd <= effectiveStart) {
                return result;
            }

            result.push({start: effectiveStart.getTime(), end: effectiveEnd.getTime()});
            return result;
        }, []);
    }

    private mergeIntervals(intervals: Interval[]): Interval[] {
        if (intervals.length === 0) {
            return [];
        }

        const sorted = [...intervals].sort((a, b) => a.start - b.start);
        const merged: Interval[] = [sorted[0]];

        for (let i = 1; i < sorted.length; i++) {
            const current = sorted[i];
            const last = merged[merged.length - 1];

            if (current.start <= last.end) {
                last.end = Math.max(last.end, current.end);
                continue;
            }

            merged.push({...current});
        }

        return merged;
    }

    private intersectIntervals(left: Interval[], right: Interval[]): Interval[] {
        if (left.length === 0 || right.length === 0) {
            return [];
        }

        const intersections: Interval[] = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            const a = left[i];
            const b = right[j];
            const start = Math.max(a.start, b.start);
            const end = Math.min(a.end, b.end);

            if (start < end) {
                intersections.push({start, end});
            }

            if (a.end < b.end) {
                i += 1;
            } else {
                j += 1;
            }
        }

        return intersections;
    }
}

type IncidentType = {
    id: string
    status: string | null
    type: string | null
    cause: number
    reason: string
    monitor: {
        id: number
        friendlyName: string
    }
    commentsCount: number
    startedAt: string | null
    resolvedAt: string | null
    duration: number
    includeInReports: boolean
}

type IncidentsResponseType = {
    nextLink?: string | null
    data?: IncidentType[]
}

type Interval = {
    start: number
    end: number
}
