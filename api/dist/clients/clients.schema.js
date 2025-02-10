"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ClientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});
//# sourceMappingURL=clients.schema.js.map