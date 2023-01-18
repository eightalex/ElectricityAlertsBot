import {StringHelper} from './StringHelper';
import {PLURAL_CONFIG} from '../constants/pluralConfig';

describe('StringHelper', () => {
    let stringHelper: StringHelper;

    beforeEach(() => {
        stringHelper = new StringHelper();
    });

    describe('pluralize', () => {
        it('should return the correct plural form for a zero number', () => {
            const number = 0;
            const expectedPluralizedString = 'годин';

            const pluralizedString = stringHelper.pluralize(number, PLURAL_CONFIG.HOURS);

            expect(pluralizedString).toEqual(expectedPluralizedString);
        });

        it('should return the correct plural form for a 1 number', () => {
            const number = 1;
            const expectedPluralizedString = 'годину';

            const pluralizedString = stringHelper.pluralize(number, PLURAL_CONFIG.HOURS);

            expect(pluralizedString).toEqual(expectedPluralizedString);
        });

        it('should return the correct plural form for a 2 number', () => {
            const number = 2;
            const expectedPluralizedString = 'хвилини';

            const pluralizedString = stringHelper.pluralize(number, PLURAL_CONFIG.MINUTES);

            expect(pluralizedString).toEqual(expectedPluralizedString);
        });
    });
});
