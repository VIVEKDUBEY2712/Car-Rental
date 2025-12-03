const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getBookings);
router.get('/:id/book', bookingController.getNewBooking);
router.post('/:id/book', bookingController.postBooking);
router.post('/:id/confirm', bookingController.confirmBooking);

module.exports = router;