const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.get('/', rideController.getRides);
router.get('/new', rideController.getNewRide);
router.post('/new', rideController.postRide);
router.post('/:id/request', rideController.requestRide);
router.get('/:id/manage', rideController.manageRequests);
router.post('/:rideId/approve/:reqId', rideController.approveRequest);
router.post('/:rideId/reject/:reqId', rideController.rejectRequest);

module.exports = router;