"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabungan = exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Number,
    },
    updated: {
        type: String,
    },
});
var tabunganSchema = new mongoose_1.Schema({
    sender: {
        type: String,
        required: true,
    },
    nominal: {
        type: Number,
        required: true,
    },
    tabungantype: {
        type: String,
        required: true,
    },
    accepted: { type: String },
    description: { type: String },
    receipt: { type: String },
    receiptname: { type: String },
    created: { type: Number },
    updated: { type: Number },
});
userSchema.statics.build = function (attr) {
    return new User(attr);
};
tabunganSchema.statics.build = function (attr) {
    return new Tabungan(attr);
};
var User = mongoose_1.model("User", userSchema);
exports.User = User;
var Tabungan = mongoose_1.model("Tabungan", tabunganSchema);
exports.Tabungan = Tabungan;
