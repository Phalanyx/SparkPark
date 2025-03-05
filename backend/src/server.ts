import  "dotenv/config"
import app from "./app"
import express from "express";
import mongoose from "mongoose";
import "./config/cloudflare";

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_DB_STRING!)
.then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
        console.log('I\'m listening to '+ port)
    });
}).catch(console.error);

