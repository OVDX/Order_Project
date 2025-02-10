"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    orderNumber: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    client: { type: mongoose_1.Types.ObjectId, ref: 'Client', required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    items: [
        {
            product: { type: mongoose_1.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
});
//# sourceMappingURL=orders.schema.js.map