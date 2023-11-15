
import { Schema, model } from "mongoose";
import { CrudModel } from "./CrudModel";
import { CommentDocument } from "./IDocument";


const commentSchema = new Schema({
    userId: {  type: String, required: true },
    requestId: {  type: String, required: true },
    text: {  type: String, required: true },

});

class CommentModel extends CrudModel<CommentDocument>{
    constructor() {
        super(model<CommentDocument>('Comment', commentSchema));
      }
}

export default CommentModel;