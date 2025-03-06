const express = require("express");
const {  connectionToDb } = require("./config/db.config");

const app = express();
const port = 5000;
app.get("/",(req,res)=>{
    console.log("getting item");
    
})

app.listen(port , async(req,res)=>{
    await connectionToDb();
    console.log("server is running");
    
})