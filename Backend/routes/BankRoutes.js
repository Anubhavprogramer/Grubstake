import express from "express";
import {
  changePassword,
  changePasswordByUserofapp,
  forgetPassword,
  getBankDetails,
  loginBank,
  logoutBank,
  registerBank,
  updateBankProfile,
} from "../controller/banksController.js";
import {
  createLoan,
  deleteLoan,
  getLoansdetails,
  getallLoans,
} from "../controller/LoanController.js";
import { isAuthenticatedBank, isAuthenticatedUser } from "../middleWares/auth.js";

const bankrouter = express.Router();

bankrouter.route("/bank/register").post(registerBank); //done
bankrouter.route("/bank/login").post(loginBank); //done
bankrouter.route("/bank/logout").post( isAuthenticatedBank, logoutBank); //done
bankrouter.route("/bank/forgotPassword").post( isAuthenticatedBank, forgetPassword); //done
bankrouter.route("/bank/changepassword/:token").put( isAuthenticatedBank, changePassword); //done
bankrouter.route("/bank/me/").get( isAuthenticatedBank, getBankDetails); //done
bankrouter.route("/bank/me/updates/passwords").put( isAuthenticatedBank, changePasswordByUserofapp); //done
bankrouter.route("/bank/me/update/profile").put( isAuthenticatedBank, updateBankProfile); //done

bankrouter.route("/bank/loan").get(isAuthenticatedBank,getallLoans); //done
bankrouter.route("/bank/user/loan").get(isAuthenticatedUser,getallLoans); //done
bankrouter.route("/bank/user/loan/:id").get(isAuthenticatedUser, getLoansdetails); //done
bankrouter.route("/bank/loan/:id").get(isAuthenticatedBank, getLoansdetails); //done
bankrouter.route("/bank/loan/create").post(isAuthenticatedBank, createLoan); //done
bankrouter.route("/bank/loan/delete/:id").delete(isAuthenticatedBank, deleteLoan); //done


export default bankrouter;
