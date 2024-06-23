const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

const donateSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  description_food: {
    type: String,
    required: true
  },
  serving_quantity: {
    type: Number,
    required: true
  },
  closing_time: {
    type: String,
    required: true
  },
  rest_site: {
    type: String,
    required: true
  },
  booked: {
    type: Boolean,
    default: false
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receivers'
  }
});

const receiveSchema = new mongoose.Schema({
  NGO_Name: {
    type: String,
    required: true
  },
  NGO_address: {
    type: String,
    required: true
  },
  NGO_phone_number: {
    type: String,
    required: true
  },
  pickup_time: {
    type: String,
    required: true
  },
  Distribution_area: {
    type: String,
    required: true
  },
  aadhar_card: {
    type: Number,
    required: true
  },
});

const fraudSchema = new mongoose.Schema({
  against: {
    type:String,
    required:true
  },
  complaint: {
   type:[String],
   required:true
  },
  description: {
    type:String,
    required:true
  },
});

const Frauds=mongoose.model('Frauds',fraudSchema);
const Receivers=mongoose.model('Receivers',receiveSchema);
const Donors = mongoose.model('Donors', donateSchema);


module.exports = {
  connectDB,
  Donors,
  Receivers,
  Frauds
}