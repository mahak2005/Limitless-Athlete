// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/User";

// interface AuthRequest extends Request {
//   user?: any;
// }

// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   let token = req.headers.authorization;

//   if (token && token.startsWith("Bearer")) {
//     try {
//       const decoded: any = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET as string);
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };import { Request, Response, NextFunction } from "express";


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Document } from "mongoose";

export interface AuthUser extends Document {
  _id: string;
  name: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return; // ✅ Ensure early return
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return; // ✅ Ensure early return
    }

    req.user = user as unknown as AuthUser; // ✅ Assign user only if found
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return; // ✅ Ensure early return
  }
};

export default authMiddleware;
