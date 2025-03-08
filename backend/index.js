const express = require("express");
const cors = require("cors");
const {  connectionToDb } = require("./config/db.config");
const { userRouter } = require("./routes/userRouter");
const { recipeRouter } = require("./routes/recipeRouter");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("get start run server");
});



app.use("/user",userRouter);
app.use("/recipe",recipeRouter);

app.listen(port , async(req,res)=>{
    await connectionToDb();
    console.log("server is running");
    
})