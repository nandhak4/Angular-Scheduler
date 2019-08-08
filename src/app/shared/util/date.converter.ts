import { CustomDate } from '../schedule.model';

export const ConvertToDate = (dateString: string, format: string): CustomDate => {

    const separator = dateString.replace(/[0-9A-Za-z\s]*/g, '').charAt(0);

    if (format.includes(separator)) {
        const value = dateString.split(separator);

        if (format === 'YYYY/MM/DD') {
            return {
                year: +value[0],
                month: +value[1] - 1,
                day: +value[2],
                hour: 0,
                minutes: 0
            };
        }
    }
    return null;
};
