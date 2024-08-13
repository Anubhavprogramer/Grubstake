import express from "express";
import {
  createSchollership,
  deleteScholarship,
  getScholarshipdetails,
  getallSchollerships,
} from "../controller/SchollershipController.js";
import { authorizePplOnly, isAuthenticatedUser } from "../middleWares/auth.js";

const SchollershipRouter = express.Router();
//creating a router

SchollershipRouter.route("/Schollerships").get(
  isAuthenticatedUser,
  getallSchollerships
);
SchollershipRouter.route("/Schollerships/new").get(
  isAuthenticatedUser,
  authorizePplOnly("admin"),
  createSchollership
);
SchollershipRouter.route("/Schollerships/:id").get(
  isAuthenticatedUser,
  getScholarshipdetails
);
SchollershipRouter.route("/Schollerships/delete/:id").delete(
  isAuthenticatedUser,
  authorizePplOnly("admin"),
  deleteScholarship
);

//exporting a router
export default SchollershipRouter;
