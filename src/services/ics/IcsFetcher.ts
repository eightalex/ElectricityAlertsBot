export interface IcsFetcherInterface {
    fetch(): string
}

export class IcsFetcher implements IcsFetcherInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    private validateUrl(url: string | undefined): asserts url is string {
        if (url === undefined) {
            throw new Error('CALENDAR_URL is nor defined')
        }
    }

    fetch(): string {
        this.validateUrl(process.env.CALENDAR_URL);

        const result = this.urlFetchApp.fetch(process.env.CALENDAR_URL, {
            method: 'get',
        });

        return result.getContentText();
    }
}
