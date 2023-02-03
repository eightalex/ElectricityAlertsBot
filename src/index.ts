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
import {IcsFetcher} from './services/ics/IcsFetcher';
import {IcsService} from './services/ics/IcsService';
import {ScheduleGenerator} from './services/ScheduleGenerator';
import {MessageSender} from './services/message/MessageSender';
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {ForecastGenerator} from './services/message/ForecastGenerator';
import {Informer} from './services/Informer';

const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService(UrlFetchApp);
const timeDifferenceGenerator = new TimeDifferenceGenerator();
const messageGenerator = new MessageGenerator(timeDifferenceGenerator);
const statisticsMessageGenerator = new StatisticsMessageGenerator();
const statisticsBuilder = new StatisticsBuilder();
const icsFetcher = new IcsFetcher(UrlFetchApp);
const icsService = new IcsService();
const scheduleGenerator = new ScheduleGenerator();
const messageSender = new MessageSender(telegramService);
const forecastGenerator = new ForecastGenerator();

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
    messageSender,
);

const scheduleInformer = new ScheduleInformer(
    icsFetcher,
    icsService,
    scheduleGenerator,
    messageSender,
);

const pinger = new Pinger(
    PropertiesService,
    messageGenerator,
    messageSender,
    forecastGenerator,
);

const informer = new Informer(
    statisticsInformer,
    scheduleInformer,
);

const app = new App(
    pinger,
    monitorsStatusChecker,
    monitorsAdapter,
    statisticsService,
    informer,
);

const config = {
    ID: 1,
    NAME: 'kombinatna25a',
    TELEGRAM_CHATS: [
        {
            chat_id: '@kombinatna_test_alerts',
        },
    ],
    MONITORS: [793136583, 793214785], // UNDERNET UNDERNET2
    STATISTICS: {
        IS_ENABLED: true,
        INFORM_TIME: '23:58',
    },
    SCHEDULE: {
        IS_ENABLED: true,
        INFORM_TIME: '08:00',
        CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
    },
};

export function ping() {
    app.ping();
}

export function doPost(event: GoogleAppsScript.Events.DoPost) {
    app.webhookUpdate(event.postData.contents);
}

export function informStatistics() {
    statisticsInformer.inform(config);
}

export function informSchedule() {
    scheduleInformer.inform(config);
}
