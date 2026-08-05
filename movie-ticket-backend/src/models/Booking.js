const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Show",
        required:true
    },


    seats:[
        {
            type:String,
            required:true
        }
    ],


    totalSeats:{
        type:Number,
        required:true
    },


    totalAmount:{
        type:Number,
        required:true
    },


    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    },


    bookingStatus:{
        type:String,
        enum:["Booked","Cancelled"],
        default:"Booked"
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Booking",
    bookingSchema
);