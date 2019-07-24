import { ValidationErrors, FormControl } from '@angular/forms';

export const dateYYYYMMDDValidatorFunction = (control: FormControl, format: string): ValidationErrors => {
    if (format !== 'yyyy/mm/dd') {
        throw new Error('Method not implemented.');
    }

    console.log('inside date validator');

    // tslint:disable-next-line: object-literal-key-quotes
    return { 'invalidDate': true };
};
