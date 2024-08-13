import app from "./app.js";
import connectDatabase from "./dataBase/database.js";

import dotenv from "dotenv";

// handleing uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})


//config
dotenv.config({path:"Backend/config/config.env"})

// connect to database

connectDatabase()
app.listen(process.env.PORT,()=>{
    console.log(`Server is on http://localhost:${process.env.PORT}`)
})



// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    })
})