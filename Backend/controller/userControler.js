import asyncHandler from "../middleWares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import sendtoken from "../utils/response.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// to register the user
export const registerNewUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendtoken(user, 201, res);
});

// to Login the user
export const loginUser = asyncHandler(async (req, res, next) => {
  // extracting the email and password form the requset
  const { email, password } = req.body;
  // checking if user has written the email or password
  if (!email || !password) {
    // if not than error will be given as the response
    return next(new ErrorHandler("Please Enter Email & password", 400));
  }
  // here we are serching for the user with the same email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    // if user dosen't exist than this will happen
    return next(new ErrorHandler("User not found", 401));
  }
  // if user exist than a function will be called that will check if password is matched or not
  const ispasswordMatched = await user.comparePassword(password);

  // if not than
  if (!ispasswordMatched) {
    // tha error will be given as response
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // token will be tken from that user and
  sendtoken(user, 200, res);
});

// to logout the user
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Loggout Successfully",
  });
});

// to forget the password
export const forgetPassword = asyncHandler(async (req, res, next) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // get resetPassword Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Synapse Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// actual change password route
export const resetPassword = asyncHandler(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // For simplicity, in a real application, you might want to hash the newPassword before saving it
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // In a real application, you would save the updated user data to your database
  // await user.save();
  await user.save();

  sendtoken(user, 200, res);
});

// Get User Details for profile section
export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
export const changePasswordByUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const ispasswordMatched = await user.comparePassword(req.body.oldPassword);
  // ?? check for the old password matched by the user
  if (!ispasswordMatched) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("old password does not matches", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  console.log("password changed successfullyand saved");
  sendtoken(user, 200, res);
});


// update user profile ---user can update his/her profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const updatedData = {
    username: req.body.username,
    email: req.body.email,
    loans: req.body.loanId,
    avatars: req.body.avatars,
    role: req.body.role,
  };
  console.log("Updating the user profile");
  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log("Updated the user profile");
  res.status(200).json({
    success: true
  });
});
