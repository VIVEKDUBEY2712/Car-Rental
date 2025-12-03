const Booking = require('../models/Booking');
const Ride = require('../models/Ride');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    if (req.session.role === 'admin') {
      const totalBookings = await Booking.countDocuments();
      const totalRides = await Ride.countDocuments();
      const totalUsers = await User.countDocuments();
      const earnings = await Booking.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);
      res.render('dashboard/admin', { totalBookings, totalRides, totalUsers, earnings: earnings[0]?.total || 0, user: req.session.userId, role: req.session.role });
    } else {
      const bookings = await Booking.find({ user: req.session.userId }).populate('car');
      const rides = await Ride.find({ owner: req.session.userId });
      res.render('dashboard/user', { bookings, rides, user: req.session.userId, role: req.session.role });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};