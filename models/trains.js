const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
    trainNo:Number,
    stops:{
        type:[String],
        required: true
     },
    trainName:String,
    days:String,
    seats:Number
});

const Train = new mongoose.model('Train', trainSchema);

module.exports = Train;