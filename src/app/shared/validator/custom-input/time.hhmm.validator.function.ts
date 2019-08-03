import { ValidationErrors, FormControl } from '@angular/forms';

const validateHours = (hours: number): string => !(hours > 0 && hours <= 12) ? 'Hours should be between 1 and 12.' : '';

const validateMinutes = (minutes: number): string => !(minutes >= 0 && minutes < 60) ? 'Minutes should be 00 and 59.' : '';

export const timeHHMMValidatorFunction = (control: FormControl, format: string): ValidationErrors => {
    if (format !== 'hh:mm') {
        throw new Error('Validator mismatch error.');
    }

    const errorMessages: string[] = [];
    const inputTime = control.value as string;

    if (!new RegExp('^\\d{1,2}:\\d{2}$').test(inputTime)) {
        errorMessages.push('Time format mismatch. Expected format: HH:MM');
    } else {
        const [hours, minutes] = inputTime.split(':').map(x => +x);

        errorMessages.push(validateHours(hours), validateMinutes(minutes));
    }

    if (errorMessages.some(x => x.length > 0)) {
        return { messages: errorMessages.filter(x => x.length > 0) };
    }
};
