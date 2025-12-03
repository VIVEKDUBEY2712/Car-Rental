const User = require('../models/User');

exports.getSignup = (req, res) => {
  res.render('auth/signup');
};

exports.postSignup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already exists');
      return res.redirect('/auth/signup');
    }
    const user = new User({ name, email, password, phone });
    await user.save();
    req.session.userId = user._id;
    req.session.role = user.role;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating account');
    res.redirect('/auth/signup');
  }
};

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/auth/login');
    }
    req.session.userId = user._id;
    req.session.role = user.role;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Login failed');
    res.redirect('/auth/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};