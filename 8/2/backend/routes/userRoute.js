const express = require('express');
const { signupController, signinController } = require('../controllers/userController');


// router
const router = express.Router();

// routes
router.get('/signup', signupController);
router.get('/signin', signinController)

module.exports = router;