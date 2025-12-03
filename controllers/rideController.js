const Ride = require('../models/Ride');
const Car = require('../models/Car');

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('owner', 'name').populate('car', 'model brand');
    res.render('rides/index', { rides, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getNewRide = async (req, res) => {
  try {
    const cars = await Car.find({ availability: true });
    res.render('rides/new', { cars, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.postRide = async (req, res) => {
  try {
    const { car, startLocation, endLocation, date, time, availableSeats, pricePerSeat, description } = req.body;
    const ride = new Ride({
      owner: req.session.userId,
      car,
      startLocation,
      endLocation,
      date,
      time,
      availableSeats,
      pricePerSeat,
      description
    });
    await ride.save();
    res.redirect('/rides');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.requestRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).send('Ride not found');
    ride.requests.push({ user: req.session.userId });
    await ride.save();
    res.redirect('/rides');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.manageRequests = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('requests.user', 'name');
    if (!ride || ride.owner.toString() !== req.session.userId) return res.status(404).send('Ride not found');
    res.render('rides/manage', { ride, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride || ride.owner.toString() !== req.session.userId) return res.status(404).send('Ride not found');
    const request = ride.requests.id(req.params.reqId);
    if (request) request.status = 'approved';
    await ride.save();
    res.redirect(`/rides/${req.params.rideId}/manage`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride || ride.owner.toString() !== req.session.userId) return res.status(404).send('Ride not found');
    const request = ride.requests.id(req.params.reqId);
    if (request) request.status = 'rejected';
    await ride.save();
    res.redirect(`/rides/${req.params.rideId}/manage`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};