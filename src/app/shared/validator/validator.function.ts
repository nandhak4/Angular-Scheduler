import { dateYYYYMMDDValidatorFunction } from './datevalidators/date.yyyymmdd.validator.function';
import { timeHHMMValidatorFunction } from './timevalidators/time.hhmm.validator.function';

import { FormControl } from '@angular/forms';

export interface CustomValidatorFunction {
    [key: string]: (control: FormControl, format: string) => {};
}

export const customValidatorFunctions: CustomValidatorFunction = {
    'yyyy/mm/dd' : dateYYYYMMDDValidatorFunction,
    'hh:mm': timeHHMMValidatorFunction
};


