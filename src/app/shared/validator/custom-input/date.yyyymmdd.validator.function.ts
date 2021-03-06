import { ValidationErrors, FormControl } from '@angular/forms';

const IsValidMonth = (month: number): boolean => (month > 0 && month <= 12);

const ValidateMonth = (month: number): string => !(IsValidMonth(month)) ? 'Month should be between Jan(01) and Dec(12).' : '';

const NoOfDaysInMonth = (year: number, month: number, day: number): number => new Date(year, month, 0).getDate();

const IsValidDay = (year: number, month: number, day: number): boolean =>
    day > 0 && day <= NoOfDaysInMonth(year, month, day);

const ValidateDay = (year: number, month: number, day: number): string =>
    IsValidMonth(month) && !(IsValidDay(year, month, day)) ? 'Day should be 1 and ' + NoOfDaysInMonth(year, month, day) + '.' : '';

export const dateYYYYMMDDValidatorFunction = (control: FormControl, format: string): ValidationErrors => {

    if (format !== 'YYYY/MM/DD') {
        throw new Error('Validator mismatch error.');
    }

    const errorMessages: string[] = [];
    const inputDate = control.value as string;

    if (!new RegExp('^\\d{4}\/\\d{1,2}\/\\d{1,2}$').test(inputDate)) {
        errorMessages.push('Date format mismatch. Expected format: YYYY/MM/DD');
    } else {
        const [year, month, day] = inputDate.split('/').map(x => +x);

        errorMessages.push(ValidateMonth(month),
            ValidateDay(year, month, day));
    }

    if (errorMessages.some(x => x.length > 0)) {
        return { messages: errorMessages.filter(x => x.length > 0) };
    }
};
