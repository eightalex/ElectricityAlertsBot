import {MonitorsAdapter, MonitorsAdapterInterface} from './MonitorsAdapter';
import {MonitorsCheckResultType} from '../../../types/MonitorsCheckResultType';
import {AppConfigType} from '../../../types/AppConfigType';
import {PreparedCheckResultType} from '../../../types/PreparedCheckResultType';

describe('MonitorsAdapter', () => {
    let monitorsAdapter: MonitorsAdapterInterface;

    beforeEach(() => {
        monitorsAdapter = new MonitorsAdapter();
    })

    describe('prepare', () => {
        it('should return correct array', () => {
            const checkResult: MonitorsCheckResultType[] = [
                {
                    id: 793359540,
                    name: 'Test Monitor',
                    status: true,
                },
                {
                    id: 793359541,
                    name: 'Test Monitor 2',
                    status: false,
                },
                {
                    id: 793359542,
                    name: 'Test Monitor 3',
                    status: true,
                },
            ];

            const appConfig: AppConfigType = [
                {
                    ID: 1,
                    NAME: 'Test Config',
                    TELEGRAM_CHATS: [
                        {
                            chat_id: '@chat',
                        }
                    ],
                    MONITORS: [793359540, 793359541],
                    STATISTICS: {
                        IS_ENABLED: true,
                        INFORM_TIME: '23:58',
                    },
                    SCHEDULE: {
                        IS_ENABLED: true,
                        INFORM_TIME: '08:00',
                        CALENDAR_URL: 'https://shutdown-calendar.fly.dev/calendar/3.ics',
                    },
                },
            ];

            const expectedResult: PreparedCheckResultType[] = [
                {
                    id: 1,
                    name: 'Test Config',
                    status: true,
                },
            ];

            const result = monitorsAdapter.prepare(checkResult, appConfig);

            expect(result).toEqual(expectedResult);
        });
    })
});
