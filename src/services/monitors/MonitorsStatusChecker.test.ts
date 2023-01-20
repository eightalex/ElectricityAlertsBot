import {MONITOR_STATUS} from '../../constants/monitorStatus';
import {MonitorsFetcher, MonitorsFetcherInterface} from './MonitorsFetcher';
import {MonitorsStatusChecker, MonitorsStatusCheckerInterface} from './MonitorsStatusChecker';

jest.mock('./MonitorsFetcher', () => {
    return {
        MonitorsFetcher: jest.fn().mockImplementation(() => {
            return {
                fetch: jest.fn(() => [
                    {
                        id: 1,
                        friendly_name: 'Host 1',
                        status: MONITOR_STATUS.UP
                    },
                    {
                        id: 2,
                        friendly_name: 'Host 2',
                        status: MONITOR_STATUS.SEEMS_DOWN
                    },
                    {
                        id: 3,
                        friendly_name: 'Host 3',
                        status: MONITOR_STATUS.DOWN
                    }
                ]),
            };
        })
    };
});

describe('MonitorsStatusChecker', () => {
    let mockedMonitorsFetcher: MonitorsFetcherInterface;
    let monitorsStatusChecker: MonitorsStatusCheckerInterface;

    beforeEach(() => {
        mockedMonitorsFetcher = jest.mocked<MonitorsFetcherInterface>(new MonitorsFetcher());
        monitorsStatusChecker = new MonitorsStatusChecker(mockedMonitorsFetcher);
    });

    it('should return an array of monitor check results', () => {
        const result = monitorsStatusChecker.check();

        expect(result).toEqual([
            {
                id: 1,
                name: 'Host 1',
                status: true
            },
            {
                id: 2,
                name: 'Host 2',
                status: false
            },
            {
                id: 3,
                name: 'Host 3',
                status: false
            }
        ]);
    });

    it('should call the fetch method on the monitors fetcher', () => {
        monitorsStatusChecker.check();

        expect(mockedMonitorsFetcher.fetch).toHaveBeenCalledTimes(1);
    });
});
