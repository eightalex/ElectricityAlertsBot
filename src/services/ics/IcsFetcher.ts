import {APP} from '../../constants/app';

export interface IcsFetcherInterface {
    fetch(): string
}

export class IcsFetcher implements IcsFetcherInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    fetch(): string {
        const result = this.urlFetchApp.fetch(APP.SCHEDULE.CALENDAR_URL, {
            method: 'get',
        });

        return result.getContentText();
    }
}
