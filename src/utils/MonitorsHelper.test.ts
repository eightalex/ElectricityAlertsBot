import {MonitorsHelper} from './MonitorsHelper';

describe('MonitorsHelper', () => {
    it('should return the check result with the specified ID', () => {
        const checkResult = [
            { id: 1, name: 'check 1', status: true },
            { id: 2, name: 'check 2', status: false },
            { id: 3, name: 'check 3', status: true },
        ];

        const result = MonitorsHelper.getCheckResult(2, checkResult);
        expect(result).toEqual({ id: 2, name: 'check 2', status: false });
    });

    it('should throw an error if the check result is undefined', () => {
        const checkResult = [
            { id: 1, name: 'check 1', status: true },
            { id: 2, name: 'check 2', status: false },
        ];

        expect(() => MonitorsHelper.getCheckResult(3, checkResult)).toThrowError('Undefined check result');
    });
});
