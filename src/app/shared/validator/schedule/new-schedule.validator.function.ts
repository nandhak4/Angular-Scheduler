import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Message } from '../../schedule.model';

export const ValidateNewSchedule =
    (start: string, end: string, DateEventId: string, TimeEventId: string, showMessage: (message: Message) => void): ValidatorFn =>
        (schedule: FormGroup): ValidationErrors => {
            const startTime: Date = schedule.get(start).value;
            const endTime: Date = schedule.get(end).value;

            if (schedule.valid && startTime && endTime) {
                showMessage(null);

                if (new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()) >
                    new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())) {

                    const [year, month, day] = [startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate()];

                    showMessage({
                        key: DateEventId,
                        value: ['Date should be greater than ' + year + '/' + month + '/' + day]
                    });

                    return { message: 'invalid schedule date' };
                } else if (startTime >= endTime) {
                    const startHour = startTime.getHours() === 0 || startTime.getHours() === 12 ? 12 : startTime.getHours() % 12;
                    const startMinute = startTime.getMinutes();
                    const session = startTime.getHours() >= 12 ? 'PM' : 'AM';

                    showMessage({
                        key: TimeEventId,
                        value: ['Time should be greater than ' + startHour + ':' + startMinute + ' ' + session]
                    });

                    return { message: 'invalid schedule time' };
                }
            }
        };
