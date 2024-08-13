import express from 'express';
import {
  getAllUser,
  getUserdetails,
  updatetoadmin,
  deleteUserbyadmin,
  getAllBanks,
  getBankById,
  deleteTheBank,
  getAllInstitute,
  getInstituteById,
  DeleteTheInstituteAdmin,
  getAllSchollershipAdmin,
  getScholarshipByIdAdmin,
  DeleteTheScholarship,
  getAllLoansAdmin,
  getLoanByIdAdmin,
  DeleteTheLoan,
} from '../controller/adminController.js';
import { authorizePplOnly, isAuthenticatedUser } from '../middleWares/auth.js';

const adminRouter = express.Router();

// Users
adminRouter.get('/Admin/users',isAuthenticatedUser, authorizePplOnly("admin"), getAllUser);   // done
adminRouter.get('/Admin/users/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getUserdetails); //done
adminRouter.put('/Admin/users/update/:id',isAuthenticatedUser,  authorizePplOnly("admin"), updatetoadmin); //done
adminRouter.delete('/Admin/users/delete/:id',isAuthenticatedUser,  authorizePplOnly("admin"), deleteUserbyadmin);  //done

// Banks
adminRouter.get('/Admin/banks',isAuthenticatedUser,  authorizePplOnly("admin"), getAllBanks); //done
adminRouter.get('/Admin/banks/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getBankById);  //done
adminRouter.delete('/Admin/banks/:id',isAuthenticatedUser,  authorizePplOnly("admin"), deleteTheBank);  //done

// Institutes
adminRouter.get('/Admin/institutes',isAuthenticatedUser,  authorizePplOnly("admin"), getAllInstitute);  //done
adminRouter.get('/Admin/institutes/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getInstituteById);  
adminRouter.delete('/Admin/institutes/:id',isAuthenticatedUser,  authorizePplOnly("admin"), DeleteTheInstituteAdmin);

// Scholarships
adminRouter.get('/Admin/scholarships',isAuthenticatedUser,  authorizePplOnly("admin"), getAllSchollershipAdmin); //done
adminRouter.get('/Admin/scholarships/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getScholarshipByIdAdmin); //done
adminRouter.delete('/Admin/scholarships/:id',isAuthenticatedUser,  authorizePplOnly("admin"), DeleteTheScholarship);  //done

// Loans
adminRouter.get('/Admin/loans',isAuthenticatedUser,  authorizePplOnly("admin"), getAllLoansAdmin);  //done
adminRouter.get('/Admin/loans/:id',isAuthenticatedUser,  authorizePplOnly("admin"), getLoanByIdAdmin);
adminRouter.delete('/Admin/loans/:id',isAuthenticatedUser,  authorizePplOnly("admin"), DeleteTheLoan);

export default adminRouter;
