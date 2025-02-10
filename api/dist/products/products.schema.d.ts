import { Schema, Document } from 'mongoose';
export declare const ProductSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    price: number;
    description?: string | null | undefined;
    image?: string | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    price: number;
    description?: string | null | undefined;
    image?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    name: string;
    price: number;
    description?: string | null | undefined;
    image?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export interface Product extends Document {
    name: string;
    price: number;
    description?: string;
    image?: string;
}
