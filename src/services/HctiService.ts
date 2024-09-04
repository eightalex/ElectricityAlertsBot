import {APP} from '../constants/app';

export interface HctiServiceInterface {
    convertSvgToPng(svgContent: string): GoogleAppsScript.Base.Blob
}

export class HctiService implements HctiServiceInterface {
    convertSvgToPng(svgContent: string): GoogleAppsScript.Base.Blob {
        const url = 'https://hcti.io/v1/image';
        const apiKey = APP.HCTI.API_KEY;
        const userId = APP.HCTI.USER_ID;

        const response = UrlFetchApp.fetch(url, {
            method: 'post',
            headers: {
                Authorization: 'Basic ' + Utilities.base64Encode(userId + ':' + apiKey),
                'Content-Type': 'application/json',
            },
            payload: JSON.stringify({
                html: svgContent,
                css: '',
                google_fonts: 'Roboto',
            })
        });

        const result = JSON.parse(response.getContentText());
        const fileUrl = result.url;

        const fileResponse = UrlFetchApp.fetch(fileUrl);
        return fileResponse.getBlob();
    }
}
