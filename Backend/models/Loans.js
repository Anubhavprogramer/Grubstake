import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the loan name"]
    },
    description: {
        type: String,
        required: [true, "Please enter the description of the loan"]
    },
    link: {
        type: String,
        required: [true, "Please enter the link to the loan website"]
    },
    amount: {
        type: Number,
        required: [true, "Please enter the loan amount"]
    },
    eligibilityCriteria: {
        type: String,
        required: [true, "Please enter the eligibility criteria for the loan"]
    },
    interestRate: {
        type: Number,
        required: [true, "Please enter the interest rate for the loan"]
    },
    isActive: {
        type: Boolean,
        default: true // Default to active
    },
    avatar: { 
        type: String,
        required: [true, "Please provide a valid URL for the avatar"]
    },
    instituteCreated: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
