import asyncHandler  from "../middleWares/catchAsyncErrors.js";
import Loan from "../models/Loans.js";
import Apifeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createLoan = asyncHandler(async (req,res,next)=>{
    const newLone = await Loan.create(req.body);
    res.status(200).json({
        success:true,
        newLone
    })
})

// ?? helps to get all the Schollerships from Databse
export const getallLoans = asyncHandler( async(req,res,next) =>{
    const resultperpage = 5; //this will store the number of products form the api
    const LoanCount = await Loan.countDocuments();
  
    //calling featureapi's search function and storing the resultant object in apifeature variable
    const apifeature = new Apifeatures(Loan.find(), req.query)
      .search() // for search feature
      .filter() // for filter feature
      .pagination(resultperpage); // for adding pagination
  
    const loans = await apifeature.query; //search according to the query and store the data in products variable
    res.status(200).json({
      success: true,
      loans,
      LoanCount
    });
});


// ?? helps to get single product by id
export const getLoansdetails = asyncHandler(async (req,res,next)=>{
    const detailsOfLoan = await Loan.findById(req.params.id);
  
    if(!detailsOfLoan){
      return next(new ErrorHandler("Product not found",404));
    }
  
    res.status(200).json({
      success:true,
      detailsOfLoan,
    });
  })
  
  //?? delete  the scholarship card prom DB
  
  export const deleteLoan = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findById(req.params.id);
  
    if(!loan){
      return next(new ErrorHandler("Product not found",404));
    }
  
    // delete the card
    await loan.deleteOne();
  
    // the send the response
  
    res.status(200).json({
      success:true,
      message:"Product deleted Successfully",
    })
  })
