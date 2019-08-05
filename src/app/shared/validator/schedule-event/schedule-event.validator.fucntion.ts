import { ValidationErrors, AbstractControl, ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { Message } from '../../schedule.model';

export const ValidateScheduleEventTime = (date: string, time: string, showMessage: (message: Message) => void): ValidatorFn =>
    (formGroup: FormGroup): ValidationErrors => {
        const [dateControl, timeControl] = [formGroup.controls[date], formGroup.controls[time]];
        if (dateControl.valid && timeControl.valid) {
            const [dateValue, timeValue] = [dateControl.value as string, timeControl.value as string];

            if (dateValue) {
                const currentDateTime = new Date();
                const [year, month, day] = dateValue.split('/').map(x => +x);

                let currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());

                if (new Date(year, month - 1, day) < currentDate) {
                    showMessage({
                        key: date, value: ['Date should be greater than or equal to ' +
                            currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate()]
                    });
                    return { message: 'invalid date' };
                }

                if (timeValue) {
                    const [hour, minutes, session] = timeValue.split(':').map(x => +x);
                    currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(),
                        currentDateTime.getHours(), currentDateTime.getMinutes());

                    if (new Date(year, month - 1, day, hour + session, minutes) < currentDate) {
                        showMessage({
                            key: time,
                            value: ['Time should be greater than ' + currentDate.getHours() + ':' +
                                currentDate.getMinutes() + (session > 0 ? ' PM' : ' AM')
                            ]
                        });
                        return { message: 'invalid time' };
                    }
                }
            }
        }
        return null;
    };
