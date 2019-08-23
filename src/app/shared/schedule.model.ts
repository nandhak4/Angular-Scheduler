export class Schedule {
    scheduleId: string;
    fromDate: Date;
    fromTime: number;
    toDate: Date;
    toTime: number;
    createdDate: Date;
    content?: any;
}

export interface Message {
    key: string;
    value: string[];
}

export interface CustomDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minutes: number;
}

export class Data {
    key: string;
    value: any;
}

export class ScheduleInfo {
    Id: string;
    begin: string;
    end: string;
    content?: any;
    createdDate: Date;
}
