// src/middleware/authTokenValidatorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EnumType } from "typescript";
import { JWT_SECRET } from "../config";
import UserModel from "../model/User";
import { UserService } from "../services/UserService";

interface TokenPayload {
  userId: string;
}

enum Roles {
  Customer="Customer",
  SupportAgent='SupportAgent',
  Admin='Admin'
}

export async function authTokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userModel = new UserModel();
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Invalid or missing authentication token" });
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' from the token string

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as TokenPayload;
    const userService = new UserService(userModel); // Create an instance of the UserService
    const user = await userService.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Set the user object in the request with the fetched user from the database
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export async function validateIsAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(401).json({ error: true, message: 'Unauthorized: User role not found.' });
    }
    if (userRole.toString() !== Roles.Admin) {
      return res.status(403).json({ error: true, message: 'Forbidden: Only Admin users can perform this action.' });
    }
    next();
  } catch (error) {
    next(error);
  }
}


// Function to check if a string is not in the enum
function isStringNotInEnum(value: string, enumObject: Roles) {
  // for (const key in enumObject as any ) {
    if (  enumObject[`${value}`] === value                ) {
      return false; // String is found in the enum
    // }
  }
  return true; // String is not found in the enum
}

export function validateRoleAndNotRole(role: string, notRole: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(401).json({ error: true, message: 'Unauthorized: User role not found.' });
      }
 if(userRole !== Roles.Admin as string 
  || userRole !== Roles.Customer as string
  || userRole !== Roles.SupportAgent as string)
  return res.status(403).json({ error: true, message: `Forbidden: Only ${userRole} users can perform this action.` });
        next();
    } catch (error) {
      next(error);
    }
  };
}


