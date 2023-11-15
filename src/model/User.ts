import { Schema, model } from "mongoose";
import { CrudModel } from "./CrudModel";
import { UserDocument } from "./IDocument";


const userSchema = new Schema({
    username: { type: String, required: true },
    first_name: {  type: String, required: true },
    last_name: { type: String, required: true },
    email:  { type: String, required: true   },
    password: { type: String, required: true  },
    role:  { type: String, required: true  },
    resetToken: { type: String  },
    resetTokenExpiration: { type: String }
});

 class UserModel extends CrudModel<UserDocument>{
    constructor() {
        super(model<UserDocument>('User', userSchema));
      }
}

export default UserModel;
