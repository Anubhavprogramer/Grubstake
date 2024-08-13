import asyncHandler from "../middleWares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Bank from "../models/bankModel.js";
import sendtoken from "../utils/response.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// register a User
export const registerBank = asyncHandler(async (req, res, next) => {
  const { name, location, branch, password, email, assets } = req.body;

  const bank = await Bank.create({
    name,
    location,
    branch,
    password,
    email,
    assets,
  });

  sendtoken(bank, 201, res);
});

// login a user
export const loginBank = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & password", 400));
  }

  const bank = await Bank.findOne({ email }).select("+password");

  if (!bank) {
    return next(new ErrorHandler("Bank not found", 401));
  }

  const isPasswordMatched = await bank.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendtoken(bank, 200, res);
});

// logout section
export const logoutBank = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "LogOut Successfully",
  });
});

// Forget Password
export const forgetPassword = asyncHandler(async (req, res, next) => {
    // Find user by email
    const bank = await Bank.findOne({ email: req.body.email });
  
    if (!bank) {
      return next(new ErrorHandler("User not found", 404));
    }
    // get resetPassword Token
  
    const resetToken = bank.getResetPasswordToken();
  
    await bank.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;
  
    try {
      await sendEmail({
        email: bank.email,
        subject: "Synapse Password Recovery",
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to: ${bank.email}`,
      });
    } catch (error) {
      bank.resetPasswordToken = undefined;
      bank.resetPasswordExpire = undefined;
  
      await bank.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });


// Change Password
export const changePassword = asyncHandler(async (req, res, next) => {
   const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    console.log("resetPasswordToken");
    
    const bank = await Bank.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!bank) {
        return next(new ErrorHandler("Invalid Token or Expired", 400));
    }
    // here we are checking if the password and confirm password are same or not
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    // here we are setting the new password
    bank.password = req.body.password;
    // after the password is changed we will set the token to undefined and expire to undefined

    bank.resetPasswordToken = undefined;
    bank.resetPasswordExpire = undefined;

    await bank.save();

    sendtoken(bank, 200, res);

});

// Get User Details for profile section
export const getBankDetails = asyncHandler(async (req, res, next) => {

  // console.log("Received ID:", req.bank.id);

  const bank = await Bank.findById(req.bank.id);

  if (!bank) {
    return next(new ErrorHandler("Bank not found", 400));
  }

  res.status(200).json({
    success: true,
    bank,
  });
});

export const changePasswordByUserofapp = asyncHandler(
  async (req, res, next) => {
    const bank = await Bank.findById(req.bank.id).select("+password");

    const ispasswordMatched = await bank.comparePassword(req.body.oldPassword);
    // ?? check for the old password matched by the user
    if (!ispasswordMatched) {
      return next(new ErrorHandler("old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("old password does not matches", 400));
    }

    bank.password = req.body.newPassword;

    await bank.save();

    sendtoken(bank, 200, res);
  }
);

export const updateBankProfile = asyncHandler(async (req, res, next) => {
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    loans: req.body.loanId,
    location: req.body.location,
    branch: req.body.branch,
    assets: req.body.assets,
    isActive: req.body.isActive,
    // here we can add more fields for the user
  };

  const bank = await Bank.findByIdAndUpdate(req.bank.id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    bank,
  });
});
