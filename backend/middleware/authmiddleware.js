import { verify } from "jsonwebtoken";
import { findById } from "../models/user";

export async function protect(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token
      const decoded = verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = await findById(decoded.id).select("-password"); // Attach user to request object
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
}

// export async function protect(req, res, next) {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
//       const decoded = verify(token, process.env.JWT_SECRET); // Verify the token

//       req.user = await findById(decoded.id).select("-password"); // Attach user to the request object

//       next(); // Proceed to the next middleware
//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
//   } else {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }
// }
