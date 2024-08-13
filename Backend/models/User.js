import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
// import ErrorHandler from "../utils/errorHandler.js";
// import { asyncHandler } from "../middleWares/catchAsyncErrors.js";
import crypto from "crypto"
// import sendtoken from "../utils/response.js";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: true // Ensuring uniqueness of emails
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength:[8,"Password must be greater than 8 characters"],
        select:false // This is to deselect it when we fetch the details of user from any route
    },
    role: {
        type: String,
        enum: ["user", "admin","manager","Bank","Institute"], // Defining the roles
        default: "user" // Default role is 'user'
    },
    // loanId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default:null,
    //     ref: 'Loan', // Reference to the Loan model
    // },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

// create a hash of the password and salting it 
userSchema.pre("save", async function(next) { //here we are creating an event that will happen before saving the data
    // we are not using arrow function because we want to use this keyword
    if (!this.isModified("password") && !this.isModified("securityKey") && !this.isModified("answer")) {
        // If none of these fields are modified, move to the next middleware
        return next();
    }

    try {
        // Hash password if modified
        // we are using if condition to check if the password is modified or not 
        // and if it is modified then we will hash the password
        if (this.isModified("password")) {
            // we are using bcrypt to hash the password
            this.password = await bcrypt.hash(this.password, 10);
        }
       
        
        // Hash answer if modified
        if (this.isModified("answer")) {
            this.answer = await bcrypt.hash(this.answer, 10);
        }

        next(); // Proceed to save
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

//JWT token
// this will generate a cookie and will store it in browser so that if user come again he/she will get logged in again
// if user signup then he/she will get a token and that token will be stored in browser and user will be logedin all the time
userSchema.methods.getJWTToken = function () {
    //here we are creating a jasson webtaoken that will make cookies that will store the token in broweser
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    //here we are defining some information related to our function
  };

// compare the password
userSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password); //bcrypt has its own function to compare the passwords and it will return true or flase and also it has two parameters
};


// Generating a password reset token
userSchema.methods.getResetPasswordToken = function(){
    // Generate a token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and set it to the resetPasswordToken field
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set the token to expire in 30 minutes
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;

}



const User = mongoose.model("User", userSchema);

export default User;
