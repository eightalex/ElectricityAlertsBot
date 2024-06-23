import {MONITORS_MAP} from './constants/monitorsConfig';
import {MonitorsFetcher} from './services/monitors/MonitorsFetcher';
import {MonitorsStatusChecker} from './services/monitors/MonitorsStatusChecker';
import {TelegramService} from './services/TelegramService';
import {MessageGenerator} from './services/message/MessageGenerator';
import {TimeDifferenceGenerator} from './services/TimeDifferenceGenerator';
import {Pinger} from './services/Pinger';
import {StatisticsBuilder} from './services/statistics/StatisticsBuilder';
import {StatisticsInformer} from './services/statistics/StatisticsInformer';
import {StatisticsMessageGenerator} from './services/statistics/StatisticsMessageGenerator';
import {StatisticsService} from './services/statistics/StatisticsService';
import {App} from './App';
import {ScheduleInformer} from './services/ScheduleInformer';
import {ScheduleGenerator} from './services/message/ScheduleGenerator';
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {ForecastGenerator} from './services/message/ForecastGenerator';
import {Informer} from './services/Informer';
import {HeartbeatService} from './services/HeartbeatService';
import {Yasno} from './services/Yasno';
import {BotConfigType} from '../types/BotConfigType';
import {OutageInformer} from './services/OutageInformer';

const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService(UrlFetchApp);
const timeDifferenceGenerator = new TimeDifferenceGenerator();
const messageGenerator = new MessageGenerator(timeDifferenceGenerator);
const statisticsMessageGenerator = new StatisticsMessageGenerator();
const statisticsBuilder = new StatisticsBuilder();
const scheduleGenerator = new ScheduleGenerator();
const forecastGenerator = new ForecastGenerator();
const heartbeatService = new HeartbeatService(PropertiesService);
const yasno = new Yasno();


const monitorsStatusChecker = new MonitorsStatusChecker(
    monitorsFetcher,
);

const statisticsService = new StatisticsService(
    PropertiesService,
    statisticsBuilder,
);

const statisticsInformer = new StatisticsInformer(
    PropertiesService,
    statisticsMessageGenerator,
    telegramService,
);

const scheduleInformer = new ScheduleInformer(
    scheduleGenerator,
    telegramService,
    yasno,
);

const outageInformer = new OutageInformer(
    telegramService,
    yasno,
);

const pinger = new Pinger(
    PropertiesService,
    messageGenerator,
    telegramService,
    forecastGenerator,
);

const informer = new Informer(
    statisticsInformer,
    scheduleInformer,
    outageInformer,
);

const app = new App(
    pinger,
    monitorsStatusChecker,
    monitorsAdapter,
    statisticsService,
    informer,
    heartbeatService,
);

const config: BotConfigType = {
    ID: 1,
    NAME: 'kombinatna25a',
    TELEGRAM_CHATS: [
        {
            chat_id: '@kombinatna_test_alerts',
        },
    ],
    MONITORS: [
        MONITORS_MAP.UNDERNET_25A_2_SECTION,
        MONITORS_MAP.BOILER_SOCKET_4_SECTION,
    ],
    STATISTICS: {
        INFORM_TIME: '23:58',
    },
    SCHEDULE: {
        INFORM_TIME: '08:00',
        GROUP: 5,
        REGION: 'kiev',
    },
    FUTURE_OUTAGE: {
        REGION: 'kiev',
        GROUP: 5,
        MINUTES: 30,
    },
};

export function ping() {
    app.ping();
}

export function doPost(event: GoogleAppsScript.Events.DoPost) {
    app.webhookHeartbeat(event.postData.contents);
}

export function informStatistics() {
    statisticsInformer.inform(config);
}

export function informSchedule() {
    scheduleInformer.inform(config);
}

export function informOutage() {
    outageInformer.inform(config);
}
