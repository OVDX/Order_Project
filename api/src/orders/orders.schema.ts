import { Schema, Document, Types } from 'mongoose';
import { Client } from '../clients/clients.schema';
import { Product } from '../products/products.schema';

export const OrderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  client: { type: Types.ObjectId, ref: 'Client', required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  items: [
    {
      product: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

export interface Order extends Document {
  orderNumber: string;
  date: Date;
  client: Types.ObjectId | Client;
  status: 'pending' | 'completed' | 'cancelled';
  items: { product: Types.ObjectId | Product; quantity: number }[];
}
