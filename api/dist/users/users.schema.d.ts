import { Schema, Document } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    username: string;
    password: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    username: string;
    password: string;
}>> & import("mongoose").FlatRecord<{
    username: string;
    password: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface User extends Document {
    username: string;
    password: string;
}
