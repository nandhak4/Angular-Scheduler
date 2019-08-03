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
