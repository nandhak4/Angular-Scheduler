export class Schedule {
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
