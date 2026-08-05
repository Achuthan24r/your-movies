const Booking = require("../models/Booking");


// ===============================
// Create Booking
// ===============================
const createBooking = async (req, res) => {
  try {

    const booking = await Booking.create({
      user: req.user.id,
      show: req.body.show,
      seats: req.body.seats,
      totalSeats: req.body.totalSeats,
      totalAmount: req.body.totalAmount
    });


    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: booking
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ===============================
// Get All Bookings (Admin)
// ===============================
const getAllBookings = async (req, res) => {

  try {

    const bookings = await Booking.find()
      .populate(
        "user",
        "name email"
      )
      .populate({
        path: "show",
        populate: [
          {
            path: "movie",
            select: "title language duration"
          },
          {
            path: "screen",
            select: "name screenType totalSeats",
            populate: {
              path: "theatre",
              select: "name city address"
            }
          }
        ]
      });


    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};



// ===============================
// Get My Bookings (User)
// ===============================
const getMyBookings = async (req,res)=>{

  try{


    const bookings = await Booking.find({
      user:req.user.id
    })
    .populate(
      "user",
      "name email"
    )
    .populate({
      path:"show",
      populate:[
        {
          path:"movie",
          select:"title language duration poster"
        },
        {
          path:"screen",
          select:"name screenType",
          populate:{
            path:"theatre",
            select:"name city address"
          }
        }
      ]
    });



    res.status(200).json({

      success:true,
      data:bookings

    });



  }catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};




// ===============================
// Cancel Booking
// ===============================
const cancelBooking = async(req,res)=>{

  try{


    const booking = await Booking.findById(
      req.params.id
    );


    if(!booking){

      return res.status(404).json({

        success:false,
        message:"Booking Not Found"

      });

    }



    booking.bookingStatus="Cancelled";

    await booking.save();



    res.status(200).json({

      success:true,
      message:"Booking Cancelled Successfully",
      data:booking

    });



  }catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};





module.exports = {

  createBooking,
  getAllBookings,
  getMyBookings,
  cancelBooking

};