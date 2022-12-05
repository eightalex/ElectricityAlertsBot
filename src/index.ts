import {STATUS} from './constants/status';
import {MESSAGE} from './constants/message';
import {STORAGE_KEY} from './constants/storageKey';
import {MonitorsConfigGenerator} from './services/MonitorsConfigGenerator';
import {TelegramService} from './services/TelegramService';
import {MonitorsAdapter} from './services/MonitorsAdapter';
import {MonitorsFetcher} from './services/MonitorsFetcher';

const monitorsConfigGenerator = new MonitorsConfigGenerator();
const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService();
const userProperties = PropertiesService.getUserProperties();
const monitorsConfig = monitorsConfigGenerator.generate(process.env.UPTIME_ROBOT_MONITORS);

function ping() {
    const monitors = monitorsFetcher.fetch(monitorsConfig);
    const preparedMonitors = monitorsAdapter.prepare(monitors);
    const isAvailable = preparedMonitors.some(monitor => monitor.status !== STATUS.SEEMS_DOWN && monitor.status !== STATUS.DOWN);
    const lastState = userProperties.getProperty(STORAGE_KEY.LAST_STATE);
    const lastTime = userProperties.getProperty(STORAGE_KEY.LAST_TIME);
    const nowDate = new Date();

    // @ts-ignore because types '1' and '' already in production
    if (lastState == isAvailable) {
        return;
    }

    userProperties.setProperties({
        [STORAGE_KEY.LAST_STATE]: isAvailable ? '1' : '',
        [STORAGE_KEY.LAST_TIME]: String(nowDate.getTime()),
    });

    telegramService.sendMessage(makeTelegramMessage(isAvailable, nowDate, lastTime));
}

function makeTelegramMessage(isAvailable: boolean, nowDate: Date, lastTime: string | null) {
    let message = isAvailable ? MESSAGE.APPEARED : MESSAGE.DISAPPEARED;

    if (lastTime === null) {
        return message;
    }

    const lastDate = new Date(Number(lastTime));
    const difference = Math.abs(nowDate.valueOf() - lastDate.valueOf());
    const timeString = new Date(difference).toISOString().substring(11, 19);

    if (isAvailable) {
        message += MESSAGE.WAS_ABSENT + timeString;
    } else {
        message += MESSAGE.WAS_AVAILABLE + timeString;
    }

    return message;
}

ping();
