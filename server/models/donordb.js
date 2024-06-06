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
  }
});

const Donors = mongoose.model('Donors', donateSchema);


module.exports = {
  connectDB,
  Donors
}
