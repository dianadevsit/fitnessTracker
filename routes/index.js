
const express = require('express');
const router = express.Router();
//require all our controllers to send routes
const landingController = require('../controllers/landingController');
const profileController = require('../controllers/profileController'); 
const fitnessController = require('../controllers/fitnessController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
//require catchErrors to catch async/await errors
const { catchErrors } = require('../handlers/errorHandlers');
//landing page
router.get('/', landingController.landingPage);