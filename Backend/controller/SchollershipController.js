// export const getallSchollerships = (req,res,next) =>{
//     res.status(200).json({
//         message:`Radhe Radhe !!!  Our server is working properly `
//     })
// } 

import asyncHandler  from "../middleWares/catchAsyncErrors.js";
import Scholarship from "../models/schollershipModel.js";
import Apifeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

// ?? helps to get all the Schollerships from Databse
export const getallSchollerships = asyncHandler( async(req,res,next) =>{
    const resultperpage = 5; //this will store the number of products form the api
    const scholarshipCount = await Scholarship.countDocuments();
  
    //calling featureapi's search function and storing the resultant object in apifeature variable
    const apifeature = new Apifeatures(Scholarship.find(), req.query)
      .search() // for search feature
      .filter() // for filter feature
      .pagination(resultperpage); // for adding pagination
  
    const scholerships = await apifeature.query; //search according to the query and store the data in products variable
    res.status(200).json({
      success: true,
      scholerships,
      scholarshipCount
    });
});


//?? creating a scholllership
export const createSchollership = asyncHandler( async (req,res,next) =>{

    req.body.instituteCreated = req.user.id;
    const newScholarship = await Scholarship.create(req.body);
    res.status(200).json({
        success:true,
        newScholarship,
    })
})



// ?? Helps to get single product by id
export const getScholarshipdetails = asyncHandler(async (req, res, next) => {
  const detailsOfScholarship = await Scholarship.findById(req.params.id);

  if (!detailsOfScholarship) {
    return next(new ErrorHandler("Scholarship not found", 404));
  }

  res.status(200).json({
    success: true,
    scholarship: detailsOfScholarship,
  });
});


//?? delete  the scholarship card prom DB
export const deleteScholarship = asyncHandler(async (req, res, next) => {
  const Scholar = await Scholarship.findById(req.params.id);

  if (!Scholar) {
    return next(new ErrorHandler("Scholarship not found", 404));
  }

  // Delete the scholarship
  await Scholar.deleteOne();

  // Send the success response
  res.status(200).json({
    success: true,
    message: "Scholarship deleted successfully",
  });
});



