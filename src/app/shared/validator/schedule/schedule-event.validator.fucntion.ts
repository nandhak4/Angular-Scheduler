import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { Message } from '../../schedule.model';

export const ValidateScheduleEventTime = (date: string, time: string, showMessage: (message: Message) => void): ValidatorFn =>
    (formGroup: FormGroup): ValidationErrors => {
        const [dateControl, timeControl] = [formGroup.controls[date], formGroup.controls[time]];
        if (dateControl.valid && timeControl.valid) {
            showMessage(null);
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
                    const [hour, minutes] = timeValue.substring(0, timeValue.includes(' ') ?
                        timeValue.indexOf(' ') : timeValue.length).split(':').map(x => +x);

                    const session = timeValue.includes('PM') ? 12 : 0;

                    const selectedHour = (hour === 12 ? session === 0 ? 0 : hour : hour + session);

                    currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(),
                        currentDateTime.getHours(), currentDateTime.getMinutes());

                    const currentHourToDisplay = (currentDateTime.getHours() > 12 ? currentDateTime.getHours() - 12 :
                        currentDateTime.getHours() === 0 ? 12 : currentDateTime.getHours());

                    if (new Date(year, month - 1, day, selectedHour, minutes) < currentDate) {
                        showMessage({
                            key: time,
                            value: ['Time should be greater than ' + currentHourToDisplay + ':' +
                                currentDate.getMinutes() + (currentDateTime.getHours() > 11 ? ' PM' : ' AM')
                            ]
                        });
                        return { message: 'invalid time' };
                    }
                }
            }
        }
        return null;
    };
