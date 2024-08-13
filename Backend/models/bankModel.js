import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the bank name"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "manager", "Banks", "Institute"],
        default: "Banks"
    },
    location: {
        type: String,
        required: [true, "Please enter the location of the bank"]
    },
    branch: {
        type: String,
        required: [true, "Please enter the branch of the bank"]
    },
    assets: {
        type: Number,
        required: [true, "Please enter the total assets of the bank"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

bankSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

bankSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

bankSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

bankSchema.methods.getResetPasswordToken = function () {
    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the token to expire in 15 minutes
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;
