import express from "express";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  forgetPassword,
  registerNewUser,
  updateUserProfile,
  resetPassword,
  changePasswordByUser,
} from "../controller/userControler.js";
import { isAuthenticatedUser } from "../middleWares/auth.js";

const userRoute = express.Router();

userRoute.route("/user/register").post(registerNewUser);
userRoute.route("/user/login").post(loginUser);
userRoute.route("/user/logout").post(logoutUser);
userRoute.route("/user/fogetpassword").post(forgetPassword);
userRoute.route("/user/password/reset/:token").put(resetPassword);
userRoute.route("/user/me").get(isAuthenticatedUser,getUserDetails);
userRoute.route("/user/me/updateProfile").put(isAuthenticatedUser,updateUserProfile);
userRoute.route("/user/me/updatepassowrd").put(isAuthenticatedUser,changePasswordByUser);

export default userRoute;
