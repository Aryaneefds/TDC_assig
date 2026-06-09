export interface Client {
    _id: string,

    firstName: string,

    lastName: string,

    city: string,

    statusTag: string;

    religion?: string;

    designation? : string
}