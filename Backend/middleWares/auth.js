import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Bank from "../models/bankModel.js";
import asyncHandler from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"; // Ensure this import is correct

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new ErrorHandler(
        "User not found. Login first to access this resource.",
        401
      )
    );
  }

  req.user = user;
  next();
});

export const authorizePplOnly = (...roles) => {
  return (req, res, next) => {

    if((!req.user)){
      return next(new ErrorHandler("Login first to access this resource.", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export const isAuthenticatedBank =  asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if(!token){
    return next(new ErrorHandler('Login first to access this resource.',401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.bank = await Bank.findById(decoded.id);

  if(!req.bank){
    return next(new ErrorHandler('Bank not found. Login first to access this resource.',401));
  }

  next();
}); 
