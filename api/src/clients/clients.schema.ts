import { Schema, Document } from 'mongoose';

export const ClientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

export interface Client extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
}
