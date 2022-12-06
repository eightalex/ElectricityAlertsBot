import {STORAGE_KEY} from './constants/storageKey';
import {MonitorsConfigGenerator} from './services/MonitorsConfigGenerator';
import {TelegramService} from './services/TelegramService';
import {MonitorsAdapter} from './services/MonitorsAdapter';
import {MonitorsFetcher} from './services/MonitorsFetcher';
import {DateHelper} from './utils/DateHelper';
import {MessageGenerator} from './services/MessageGenerator';
import {TimeStringGenerator} from './services/TimeStringGenerator';
import {MonitorsStatusChecker} from './services/MonitorsStatusChecker';

const monitorsConfigGenerator = new MonitorsConfigGenerator();
const monitorsStatusChecker = new MonitorsStatusChecker();
const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService();
const dateHelper = new DateHelper();
const timeStringGenerator = new TimeStringGenerator(dateHelper);
const messageGenerator = new MessageGenerator(timeStringGenerator);
const userProperties = PropertiesService.getUserProperties();
const monitorsConfig = monitorsConfigGenerator.generate(process.env.UPTIME_ROBOT_MONITORS);

function ping() {
    const monitors = monitorsFetcher.fetch(monitorsConfig);
    const preparedMonitors = monitorsAdapter.prepare(monitors);
    const isAvailable = monitorsStatusChecker.check(preparedMonitors);
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

    const message = messageGenerator.generate({isAvailable, lastTime, nowDate})
    telegramService.sendMessage(message);
}

ping();
