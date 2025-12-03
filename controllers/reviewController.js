const Review = require('../models/Review');
const Booking = require('../models/Booking');

exports.postReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const carId = req.params.id;
    // Check if user has booked this car
    const booking = await Booking.findOne({ user: req.session.userId, car: carId, status: 'confirmed' });
    if (!booking) {
      req.flash('error', 'You can only review cars you have rented');
      return res.redirect(`/cars/${carId}`);
    }
    const review = new Review({ user: req.session.userId, car: carId, rating, comment });
    await review.save();
    res.redirect(`/cars/${carId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};