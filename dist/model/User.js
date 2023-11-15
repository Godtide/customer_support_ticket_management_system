"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CrudModel_1 = require("./CrudModel");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiration: { type: String }
});
class UserModel extends CrudModel_1.CrudModel {
    constructor() {
        super((0, mongoose_1.model)('User', userSchema));
    }
}
exports.default = UserModel;
