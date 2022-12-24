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
    dateHelper,
);

function ping() {
    app.ping();
}

function inform() {
    statisticsInformer.inform();
}

function resetStatistics() {
    statisticsService.reset();
}

ping();
inform();
resetStatistics();
