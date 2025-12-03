const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB

connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Set EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static('public'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/cars', require('./routes/cars'));
app.use('/bookings', require('./routes/bookings'));
app.use('/reviews', require('./routes/reviews'));
app.use('/rides', require('./routes/rides'));
app.use('/dashboard', require('./routes/dashboard'));

// Home route
app.get('/', (req, res) => {
  res.render('index', { user: req.session.userId, role: req.session.role });
});

// Middleware to check authentication
app.use((req, res, next) => {
  if (!req.session.userId && req.path !== '/auth/login' && req.path !== '/auth/signup' && req.path !== '/') {
    return res.redirect('/auth/login');
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});