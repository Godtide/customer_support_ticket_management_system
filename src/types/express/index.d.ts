import { UserDocument } from "../../model/IDocument";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
  }
}
