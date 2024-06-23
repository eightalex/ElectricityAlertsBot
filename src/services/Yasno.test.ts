import {Yasno} from './Yasno';

const defaultFetchMethods = {
    getAllHeaders: jest.fn(),
    getAs: jest.fn(),
    getBlob: jest.fn(),
    getContent: jest.fn(),
    getResponseCode: jest.fn(),
    isSslCertificateValid: jest.fn(),
    getHeaders: jest.fn(),
}

const UrlFetchApp = {
    fetch: jest.fn().mockImplementation(() => ({
        getContentText: jest.fn().mockReturnValue(JSON.stringify({components: []})),
        ...defaultFetchMethods,
    })),
};

(global as any).UrlFetchApp = UrlFetchApp;

describe('Yasno', () => {
    let yasno: Yasno;

    beforeEach(() => {
        jest.clearAllMocks();
        yasno = new Yasno();
    });

    describe('getSchedule', () => {
        it('should return null if region is not available', () => {
            const result = yasno.getSchedule({region: 'kiev', group: 1, day: 0});
            expect(result).toBeNull();
        });

        it('should return null if group is not available', () => {
            jest.spyOn(UrlFetchApp, 'fetch').mockImplementation(() => ({
                getContentText: jest.fn().mockReturnValue(JSON.stringify({components: [{template_name: 'electricity-outages-schedule', available_regions: ['kiev'], schedule: {kiev: {}}}]})),
                ...defaultFetchMethods,
            }));
            const result = yasno.getSchedule({region: 'kiev', group: 1, day: 0});
            expect(result).toBeNull();
        });

        it('should return null if day is not available', () => {
            jest.spyOn(UrlFetchApp, 'fetch').mockImplementation(() => ({
                getContentText: jest.fn().mockReturnValue(JSON.stringify({components: [{template_name: 'electricity-outages-schedule', available_regions: ['kiev'], schedule: {kiev: {group_1: {}}}}]})),
                ...defaultFetchMethods,
            }));
            const result = yasno.getSchedule({region: 'kiev', group: 1, day: 0});
            expect(result).toBeNull();
        });

        it('should return schedule if region, group and day are available', () => {
            const expectedSchedule = [{start: 1, end: 2}];
            jest.spyOn(UrlFetchApp, 'fetch').mockImplementation(() => ({
                getContentText: jest.fn().mockReturnValue(JSON.stringify({components: [{template_name: 'electricity-outages-schedule', available_regions: ['kiev'], schedule: {kiev: {group_1: {0: expectedSchedule}}}}]})),
                ...defaultFetchMethods,
            }));
            const result = yasno.getSchedule({region: 'kiev', group: 1, day: 0});
            expect(result).toEqual(expectedSchedule);
        });
    });

    describe('checkFutureOutage', () => {
        it('should return false if there is no schedule', () => {
            jest.spyOn(Yasno.prototype, 'getSchedule').mockReturnValue(null);
            const result = yasno.checkFutureOutage({region: 'kiev', group: 1, minutes: 30});
            expect(result).toBe(false);
        });

        it('should return false if there is no outage in the next 30 minutes', () => {
            jest.spyOn(Yasno.prototype, 'getSchedule').mockReturnValue([{start: 1, end: 5, type: 'DEFINITE_OUTAGE'}]);
            jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);
            jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(0);
            const result = yasno.checkFutureOutage({region: 'kiev', group: 1, minutes: 30});
            expect(result).toBe(false);
        });

        it('should return true if there is an outage in the next 30 minutes', () => {
            jest.spyOn(Yasno.prototype, 'getSchedule').mockReturnValue([{start: 1, end: 5, type: 'DEFINITE_OUTAGE'}]);
            jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);
            jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(30);
            const result = yasno.checkFutureOutage({region: 'kiev', group: 1, minutes: 30});
            expect(result).toBe(true);
        });

        it('should return true if there is an outage in the next 30 minutes', () => {
            jest.spyOn(Yasno.prototype, 'getSchedule').mockReturnValue([{start: 0, end: 4, type: 'DEFINITE_OUTAGE'}]);
            jest.spyOn(Date.prototype, 'getHours').mockReturnValue(23);
            jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(30);
            const result = yasno.checkFutureOutage({region: 'kiev', group: 1, minutes: 30});
            expect(result).toBe(true);
        });
    });
});
