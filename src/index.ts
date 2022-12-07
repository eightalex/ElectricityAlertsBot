import {MonitorsConfigGenerator} from './services/monitors/MonitorsConfigGenerator';
import {MonitorsAdapter} from './services/monitors/MonitorsAdapter';
import {MonitorsFetcher} from './services/monitors/MonitorsFetcher';
import {MonitorsStatusChecker} from './services/monitors/MonitorsStatusChecker';
import {TelegramService} from './services/TelegramService';
import {MessageGenerator} from './services/MessageGenerator';
import {TimeStringGenerator} from './services/TimeStringGenerator';
import {Pinger} from './services/Pinger';
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

const pinger = new Pinger(
    PropertiesService,
    monitorsConfigGenerator,
    monitorsFetcher,
    monitorsAdapter,
    monitorsStatusChecker,
    messageGenerator,
    telegramService,
);

function ping() {
    pinger.ping();
}

ping();
