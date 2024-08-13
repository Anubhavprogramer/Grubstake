import express from "express";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middleWares/err.js";

import cors from "cors";

// route imports
const app = express();

// middlewares
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json())
app.use(cookieParser())

// route imports

import SchollershipRouter from "./routes/ScollershipRoute.js";
import router from "./routes/adminroute.js";
import bankrouter from "./routes/BankRoutes.js";
import userRoute from "./routes/UserRoute.js";
import adminRouter from "./routes/adminroute.js";

// using the routes
app.use("/api/v1",SchollershipRouter)
app.use("/api/v2",userRoute)
app.use("/api/v3",bankrouter)
app.use("/api/v5",router)
app.use("/api/v6",adminRouter)

// middleware to handle errors
app.use(errorMiddleware);

export default app;