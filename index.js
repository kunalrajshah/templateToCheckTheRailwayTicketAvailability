const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Train = require("./models/trains");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname,'/clients/build')));
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (!err) {
      console.log("Mongodb succesfully connected");
    }
    else{
      console.log(err);
    }
  });

app.use((req,res,next)=>{
    res.sendFile(path.resolve(__dirname,"clients","build","index.html"))
})

app.post("/addTrain", (req,res)=>{

    const {trainNo, stops, trainName, days, seats} = req.body;

    const train = new Train({
        trainNo: trainNo,
        stops: stops,
        trainName: trainName,
        days: days,
        seats: seats
    });
    train.save((err)=>{
        if(err) {
            console.log(err);
        }
    })
    res.json({
        success: "true",
        train: train
    })
})

app.post("/search", async (req, res)=>{
    console.log(req.body);
    const {start, dest} = req.body;
    try {
        const train = await Train.find({stops: { $all : [start, dest]}});
        console.log(train);
        if(train!=[]){
            res.json({
                success: "true",
                "train": train
            })
        }else{
            res.json({
                success: "false"
            })
        }
    } catch (error) {
        console.log(error);
    }

})

app.get("/", (req, res)=>{
    res.json({"message": "This is railway app"});
})
const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
    console.log("Server started at port 5000");
});