const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.get('/', carController.getCars);
router.get('/add', carController.getAddCar);
router.post('/add', upload.array('images'), carController.postAddCar);
router.get('/:id', carController.getCar);
router.get('/:id/edit', carController.getEditCar);
router.post('/:id/edit', carController.postEditCar);
router.post('/:id/delete', carController.deleteCar);

module.exports = router;