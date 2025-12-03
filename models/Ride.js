const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  pricePerSeat: { type: Number, required: true },
  description: { type: String },
  requests: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    requestedAt: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ride', rideSchema);