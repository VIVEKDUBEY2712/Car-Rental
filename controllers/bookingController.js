const Booking = require('../models/Booking');
const Car = require('../models/Car');
const moment = require('moment');

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.session.userId }).populate('car');
    res.render('bookings/index', { bookings, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getNewBooking = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('bookings/new', { car, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.postBooking = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const car = await Car.findById(req.params.id);
    if (!car || !car.availability) return res.status(400).send('Car not available');

    // Check for overlapping bookings
    const overlapping = await Booking.find({
      car: req.params.id,
      status: 'confirmed',
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
      ]
    });
    if (overlapping.length > 0) {
      req.flash('error', 'Car is already booked for these dates');
      return res.redirect(`/cars/₹{req.params.id}/book`);
    }

    const days = moment(endDate).diff(moment(startDate), 'days');
    const totalAmount = days * car.pricePerDay;

    const booking = new Booking({
      user: req.session.userId,
      car: req.params.id,
      startDate,
      endDate,
      totalAmount,
      status: 'pending'
    });
    await booking.save();
    res.redirect('/bookings');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// For payment, we'll assume Stripe integration later
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.session.userId) return res.status(404).send('Booking not found');
    // Integrate payment here
    booking.status = 'confirmed';
    await booking.save();
    res.redirect('/bookings');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};