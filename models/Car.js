const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true },
  images: [{ type: String }], // Array of image URLs
  description: { type: String },
  year: { type: Number },
  type: { type: String, enum: ['sedan', 'suv', 'hatchback', 'luxury'], default: 'sedan' },
  seatingCapacity: { type: Number, default: 5 },
  fuelType: { type: String, enum: ['petrol', 'diesel', 'electric'], default: 'petrol' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', carSchema);