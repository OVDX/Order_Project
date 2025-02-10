import { Schema, Document } from 'mongoose';
export declare const ClientSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    email: string;
    phone: string;
    address: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    phone: string;
    address: string;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    phone: string;
    address: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface Client extends Document {
    name: string;
    email: string;
    phone: string;
    address: string;
}
