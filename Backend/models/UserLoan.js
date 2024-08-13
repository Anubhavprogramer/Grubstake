import mongoose from "mongoose";

const userLoanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan', // Reference to the Loan model
        required: true
    },
    isStarred: {
        type: Boolean,
        default: false // Default to not starred
    }
});

const UserLoan = mongoose.model("UserLoan", userLoanSchema);

export default UserLoan;
