export interface IcsFetcherInterface {
    fetch(url: string): string
}

export class IcsFetcher implements IcsFetcherInterface {
    constructor(
        private urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp,
    ) {}

    fetch(url: string): string {
        const result = this.urlFetchApp.fetch(url, {
            method: 'get',
        });

        return result.getContentText();
    }
}
