import { CustomDate } from '../schedule.model';

export const ConvertToTime = (timeString: string, format: string): CustomDate => {
    const separator = timeString.replace(/[0-9a-zA-Z\s]*/g, '').charAt(0);

    if (format.includes(separator)) {
        const value = timeString.replace(/[A-Za-z\s]*/g, '').split(separator);
        const session = timeString.replace(/[^A-Za-z]*/g, '').toUpperCase();

        if (format === 'hh:mm') {
            return {
                year: 0,
                month: 0,
                day: 0,
                hour: +value[0] + (session === 'AM' || +value[0] === 12 ? 0 : 12),
                minutes: +value[1]
            };
        }
    }
    return null;
};
