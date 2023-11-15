"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CrudModel_1 = require("./CrudModel");
const commentSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    requestId: { type: String, required: true },
    text: { type: String, required: true },
});
class CommentModel extends CrudModel_1.CrudModel {
    constructor() {
        super((0, mongoose_1.model)('Comment', commentSchema));
    }
}
exports.default = CommentModel;
