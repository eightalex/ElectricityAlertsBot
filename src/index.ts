import {STORAGE_KEY} from './constants/storageKey';
import {MonitorsConfigGenerator} from './services/monitors/MonitorsConfigGenerator';
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {MonitorsFetcher} from './services/monitors/MonitorsFetcher';
import {MonitorsStatusChecker} from './services/monitors/MonitorsStatusChecker';
import {TelegramService} from './services/TelegramService';
import {MessageGenerator} from './services/MessageGenerator';
import {TimeStringGenerator} from './services/TimeStringGenerator';
import {DateHelper} from './utils/DateHelper';
import {StringHelper} from './utils/StringHelper';

const monitorsConfigGenerator = new MonitorsConfigGenerator();
const monitorsStatusChecker = new MonitorsStatusChecker();
const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService();
const dateHelper = new DateHelper();
const stringHelper = new StringHelper();
const timeStringGenerator = new TimeStringGenerator(dateHelper, stringHelper);
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
