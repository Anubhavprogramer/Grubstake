import asyncHandler from "../middleWares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/User.js";
import Bank from "../models/bankModel.js";
import Scholarship from "../models/schollershipModel.js"
import Loan from "../models/Loans.js"


//admin can get all the user 
export const getAllUser = asyncHandler(async(req,res,next)=>{
    const users= await User.find();

    res.status(200).json({
        users,
    })
})

// get user details --- admin (single user)
export const getUserdetails = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with id:${req.params.id}`,404))
    }

    res.status(200).json({
        success:true,
        user,
    })
})

// Admin can update the user profile to admin 
export const updatetoadmin = asyncHandler(async(req,res,next)=>{
    const newUserData={
        role:req.body.role
    };
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    res.status(200).json({
        success:true,
    })
})

// delete the user from the database
export const deleteUserbyadmin = asyncHandler(async(req,res,next)=>{

    const user = await User.findById(req.params.id,);
    // we will remove the couldinary

    if(!user){
        return next(new ErrorHandler("User not found with this Id ",404))
    }
    await user.deleteOne();
    res.status(200).json({
        success:true,
    })
})


// Get all the banks by admin



export const getAllBanks = asyncHandler(async (req,res,next)=>{
    const bank = await Bank.find();

    res.status(200).json({
        bank
    })
})

export const getBankById = asyncHandler(async(req,res,next)=>{
    const bank = await Bank.findById(req.params.id);

    if(!bank){
        return next(new ErrorHandler(`Bank not found with id:${req.params.id}`,400))
    }

    res.status(200).json({
        success:true,
        bank,
    })
})

export const deleteTheBank = asyncHandler(async (req,res,next)=>{
    const bank = await Bank.findById(req.params.id);

    if(!bank){
        return next(new ErrorHandler("Bank not found with this Id ",404))
    }
    await Bank.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true
    })
})

//institute

export const getAllInstitute = asyncHandler(async(req,res,next)=>{
    const institute = await Institute.find();

    res.status(200).json({
        institute
    })
})

export const getInstituteById = asyncHandler(async(req,res,next)=>{
    const institute = await Institute.findById(req.body.id);

    if(!institute){
        return next(new ErrorHandler("Institute By this ID not found ",404))
    }
    res.status(200).json({
        institute
    })
})

export const DeleteTheInstituteAdmin = asyncHandler(async(req,res,next)=>{
    const institute = await Institute.findById(req.params.id);

    if(!institute){
        return next(new ErrorHandler("Institute not found by this ID",404))
    }

    await institute.remove();
    res.status(200).json({
        success:true
    })
})

//scollerships
export const getAllSchollershipAdmin = asyncHandler(async(req,res,next)=>{
    const scholarship = await Scholarship.find();
    res.status(200).json({
        scholarship
    })
})

export const getScholarshipByIdAdmin = asyncHandler(async(req,res,next)=>{
    const scholarship = await Scholarship.findById(req.params.id);

    if(!scholarship){
        return next(new ErrorHandler("Scholarship By this ID not found ",404))
    }
    res.status(200).json({
        scholarship
    })
})

export const DeleteTheScholarship = asyncHandler(async(req,res,next)=>{
    const scholarship = await Scholarship.findById(req.params.id);

    if(!scholarship){
        return next(new ErrorHandler("Scholarship not found by this ID",404))
    }

    await Scholarship.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true
    })
})


//loans

export const getAllLoansAdmin = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.find();

    res.status(200).json({
        loan
    })
})

export const getLoanByIdAdmin = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findById(req.body.id);

    if(!loan){
        return next(new ErrorHandler("Loan By this ID not found ",404))
    }
    res.status(200).json({
        loan
    })
})

export const DeleteTheLoan = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findById(req.params.id);

    if(!loan){
        return next(new ErrorHandler("Loan not found by this ID",404))
    }

    await loan.remove();
    res.status(200).json({
        success:true
    })
})