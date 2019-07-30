import { dateYYYYMMDDValidatorFunction } from './date.yyyymmdd.validator.function';
import { timeHHMMValidatorFunction } from './time.hhmm.validator.function';

import { AbstractControl } from '@angular/forms';

export interface AppInputValidatorFunction {
    [key: string]: (control: AbstractControl, format: string) => {};
}

export const appInputValidatorFunction: AppInputValidatorFunction = {
    'yyyy/mm/dd' : dateYYYYMMDDValidatorFunction,
    'hh:mm': timeHHMMValidatorFunction
};


