import {APP} from './constants/app';
import {MONITORS_CONFIG, MONITORS_CONFIG_DEV} from './constants/monitorsConfig';
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
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {ForecastGenerator} from './services/message/ForecastGenerator';
import {Informer} from './services/Informer';

const monitorsAdapter = new MonitorsAdapter();
const monitorsFetcher = new MonitorsFetcher();
const telegramService = new TelegramService();
const timeDifferenceGenerator = new TimeDifferenceGenerator();
const messageGenerator = new MessageGenerator(timeDifferenceGenerator);
const statisticsMessageGenerator = new StatisticsMessageGenerator();
const statisticsBuilder = new StatisticsBuilder();
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
    telegramService,
);

const pinger = new Pinger(
    PropertiesService,
    messageGenerator,
    telegramService,
    forecastGenerator,
);

const informer = new Informer(
    statisticsInformer,
);

const app = new App(
    pinger,
    monitorsStatusChecker,
    monitorsAdapter,
    statisticsService,
    informer,
);

const manualConfig = (APP.MODE === 'production' ? MONITORS_CONFIG : MONITORS_CONFIG_DEV)[0];

export function ping() {
    app.ping();
}

export function multiplyPing() {
    app.multiplyPing();
}

export function informStatistics() {
    if (!manualConfig) {
        throw new Error('Manual config is not available');
    }

    informer.inform('STATISTICS', {config: manualConfig, nowDate: new Date()})
}

export function resetInformers() {
    if (!manualConfig) {
        throw new Error('Manual config is not available');
    }

    informer.reset('STATISTICS', manualConfig.ID);
}

export function getProperties() {
    const userProperties = PropertiesService.getUserProperties();
    Logger.log(userProperties.getProperties());
}
