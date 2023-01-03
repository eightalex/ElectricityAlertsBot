import {MonitorsConfigGenerator} from './services/monitors/MonitorsConfigGenerator';
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {MonitorsFetcher} from './services/monitors/MonitorsFetcher';
import {MonitorsStatusChecker} from './services/monitors/MonitorsStatusChecker';
import {TelegramService} from './services/TelegramService';
import {MessageGenerator} from './services/MessageGenerator';
import {TimeDifferenceGenerator} from './services/TimeDifferenceGenerator';
import {Pinger} from './services/Pinger';
import {DateHelper} from './utils/DateHelper';
import {StringHelper} from './utils/StringHelper';
import {StatisticsBuilder} from './services/statistics/StatisticsBuilder';
import {StatisticsInformer} from './services/statistics/StatisticsInformer';
import {StatisticsMessageGenerator} from './services/statistics/StatisticsMessageGenerator';
import {StatisticsService} from './services/statistics/StatisticsService';
import {App} from './App';
import {ScheduleInformer} from './services/ScheduleInformer';
import {IcsFetcher} from './services/ics/IcsFetcher';
import {IcsService} from './services/ics/IcsService';
import {ScheduleGenerator} from './services/ScheduleGenerator';

const monitorsConfigGenerator = new MonitorsConfigGenerator();
const monitorsFetcher = new MonitorsFetcher();
const monitorsAdapter = new MonitorsAdapter();
const telegramService = new TelegramService(UrlFetchApp);
const stringHelper = new StringHelper();
const dateHelper = new DateHelper(stringHelper);
const timeDifferenceGenerator = new TimeDifferenceGenerator(dateHelper);
const messageGenerator = new MessageGenerator(timeDifferenceGenerator);
const statisticsMessageGenerator = new StatisticsMessageGenerator(dateHelper);
const statisticsBuilder = new StatisticsBuilder(dateHelper);
const icsFetcher = new IcsFetcher(UrlFetchApp);
const icsService = new IcsService(dateHelper);
const scheduleGenerator = new ScheduleGenerator(dateHelper);

const monitorsStatusChecker = new MonitorsStatusChecker(
    monitorsConfigGenerator,
    monitorsFetcher,
    monitorsAdapter,
);

const statisticsService = new StatisticsService(
    PropertiesService,
    statisticsBuilder,
    dateHelper,
);

const statisticsInformer = new StatisticsInformer(
    PropertiesService,
    statisticsMessageGenerator,
    telegramService,
);

const scheduleInformer = new ScheduleInformer(
    icsFetcher,
    icsService,
    scheduleGenerator,
    telegramService,
);

const pinger = new Pinger(
    PropertiesService,
    messageGenerator,
    telegramService,
);

const app = new App(
    pinger,
    monitorsStatusChecker,
    statisticsService,
    statisticsInformer,
    scheduleInformer,
    dateHelper,
);

function ping() {
    app.ping();
}

function resetStatistics() {
    statisticsService.reset();
}

function informStatistics() {
    statisticsInformer.inform();
}

function informSchedule() {
    scheduleInformer.inform();
}

ping();
resetStatistics();
informStatistics();
informSchedule()
