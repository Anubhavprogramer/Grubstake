import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the scholarship name"],
    },
    isGovernment: {
        type: Boolean,
        default: true,
    },
    link: {
        type: String,
        required: [true, "Please enter the valid link of the scholarship"]
    },
    scholarshipType: {
        type: String,
        enum: ["Merit-based", "Need-based", "Athletic", "Minority", "Disability", "Others"],
        default: "Others"
    },
    avatar: {
        type: String,
        required: [true, "Please provide a valid URL for the avatar"]
    },
    Application_Starting: {
        type: Date,
        required: [true, "Please enter the start date of the scholarship"]
    },
    application_Closing: {
        type: Date,
        required: [true, "Please enter the closing date for the scholarship application"]
    },
    amount: {
        type: Number,
        required: [true, "Please enter the amount of the scholarship"]
    },
    eligibilityCriteria: {
        type: String,
        required: [true, "Please provide the eligibility criteria"]
    },
    provider: {
        type: String,
        required: [true, "Please enter the provider of the scholarship"]
    },
    instituteCreated: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
