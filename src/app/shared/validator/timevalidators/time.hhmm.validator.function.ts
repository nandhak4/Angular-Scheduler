import { ValidationErrors, FormControl } from '@angular/forms';

export const timeHHMMValidatorFunction = (control: FormControl, format: string): ValidationErrors => {
    if (format !== 'hh:mm') {
        throw new Error('Method not implemented.');
    }

    console.log('inside time validator');

    // tslint:disable-next-line: object-literal-key-quotes
    return { 'invalidDate': true };
};
