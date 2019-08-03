import { ValidationErrors, AbstractControl, ValidatorFn, FormControl, FormGroup } from '@angular/forms';
import { Message } from '../../schedule.model';

export const ValidateScheduleEventTime = (date: string, time: string, showMessage: (message: Message) => void): ValidatorFn =>
    (formGroup: FormGroup): ValidationErrors => {
        const [dateFormControl, timeFormControl] = [formGroup.controls[date], formGroup.controls[time]];
        if (dateFormControl.valid && timeFormControl.valid) {
            const [dateValue, timeValue] = [formGroup.controls[date].value as string, formGroup.controls[time].value as string];

            if (dateValue) {
                const currentDateTime = new Date();
                const [year, month, day] = dateValue.split('/').map(x => +x);

                let currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
                // tslint:disable-next-line: no-debugger
                debugger;
                if (new Date(year, month - 1, day) < currentDate) {
                    showMessage({
                        key: date, value: ['Date should be greater than or equal to ' +
                            currentDate.getFullYear() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getDate()]
                    });
                    return { message: 'invalid date' };
                }

                if (timeValue) {
                    const [hour, minutes] = timeValue.split(':').map(x => +x);

                    currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(),
                        currentDateTime.getHours(), currentDateTime.getMinutes());

                    if (new Date(year, month - 1, day, hour, minutes) < currentDate) {
                        showMessage({
                            key: time,
                            value: ['Time should be greater than ' + currentDate.getHours() + ':' + currentDate.getMinutes()
                            ]
                        });
                        return { message: 'invalid time' };
                    }
                }
            }
        }
        return null;
    };
