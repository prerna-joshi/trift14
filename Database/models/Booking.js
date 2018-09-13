const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    booking_id:{type:String,required:true,unique:true},
    email_id:{type:String,required:true},
    name:String,
    contact_no:Number,
    origin:String,
    destination:String,
    cities:Array,
    days:Number,
    flights:Object,
    hotels:Object,
    activities:Object,
    reminders:Object,
    departure:Date,
    comments:String,
    trip_id:String

    
})

const Booking = mongoose.model("Booking",BookingSchema)

module.exports = Booking