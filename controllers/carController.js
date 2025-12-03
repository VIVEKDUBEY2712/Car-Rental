const Car = require('../models/Car');
const Review = require('../models/Review');

exports.getCars = async (req, res) => {
  try {
    const { brand, type, location, minPrice, maxPrice } = req.query;
    let query = {};
    if (brand) query.brand = new RegExp(brand, 'i');
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = parseInt(minPrice);
      if (maxPrice) query.pricePerDay.$lte = parseInt(maxPrice);
    }
    const cars = await Car.find(query);
    res.render('cars/index', { cars, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    const reviews = await Review.find({ car: req.params.id }).populate('user', 'name');
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    res.render('cars/show', { car, reviews, avgRating, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getAddCar = (req, res) => {
  if (req.session.role !== 'admin') return res.redirect('/');
  res.render('cars/add', { user: req.session.userId, role: req.session.role });
};

exports.postAddCar = async (req, res) => {
  if (req.session.role !== 'admin') return res.redirect('/');
  try {
    const { model, brand, pricePerDay, pricePerHour, location, description, year, type, seatingCapacity, fuelType } = req.body;
    const images = req.files ? req.files.map(f => f.filename) : [];
    const car = new Car({ model, brand, pricePerDay, pricePerHour, location, description, year, type, seatingCapacity, fuelType, images });
    await car.save();
    res.redirect('/cars');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getEditCar = async (req, res) => {
  if (req.session.role !== 'admin') return res.redirect('/');
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.render('cars/edit', { car, user: req.session.userId, role: req.session.role });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.postEditCar = async (req, res) => {
  if (req.session.role !== 'admin') return res.redirect('/');
  try {
    const { model, brand, pricePerDay, pricePerHour, location, description, year, type, seatingCapacity, fuelType } = req.body;
    await Car.findByIdAndUpdate(req.params.id, { model, brand, pricePerDay, pricePerHour, location, description, year, type, seatingCapacity, fuelType });
    res.redirect('/cars');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteCar = async (req, res) => {
  if (req.session.role !== 'admin') return res.redirect('/');
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.redirect('/cars');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};