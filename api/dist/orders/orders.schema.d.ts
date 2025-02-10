import { Schema, Document, Types } from 'mongoose';
import { Client } from '../clients/clients.schema';
import { Product } from '../products/products.schema';
export declare const OrderSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    date: NativeDate;
    orderNumber: string;
    client: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    status: "pending" | "completed" | "cancelled";
    items: Types.DocumentArray<{
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }, Types.Subdocument<Types.ObjectId, any, {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }> & {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }>;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    date: NativeDate;
    orderNumber: string;
    client: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    status: "pending" | "completed" | "cancelled";
    items: Types.DocumentArray<{
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }, Types.Subdocument<Types.ObjectId, any, {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }> & {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }>;
}>> & import("mongoose").FlatRecord<{
    date: NativeDate;
    orderNumber: string;
    client: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    status: "pending" | "completed" | "cancelled";
    items: Types.DocumentArray<{
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }, Types.Subdocument<Types.ObjectId, any, {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }> & {
        product: {
            prototype?: Types.ObjectId | null | undefined;
            cacheHexString?: unknown;
            generate?: {} | null | undefined;
            createFromTime?: {} | null | undefined;
            createFromHexString?: {} | null | undefined;
            createFromBase64?: {} | null | undefined;
            isValid?: {} | null | undefined;
        };
        quantity: number;
    }>;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export interface Order extends Document {
    orderNumber: string;
    date: Date;
    client: Types.ObjectId | Client;
    status: 'pending' | 'completed' | 'cancelled';
    items: {
        product: Types.ObjectId | Product;
        quantity: number;
    }[];
}
