const express = require('express');
const { signupController, signinController, changeNameController, changePasswordController, changeUserDetailsController, getAllUsersController, searchUserByNameController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


// router
const router = express.Router();

// routes
router.post('/signup', signupController);
router.post('/signin', signinController);
router.get('/change-name', authMiddleware, changeNameController);
router.get('/change-password', authMiddleware, changePasswordController);
router.get('/change-details', authMiddleware, changeUserDetailsController);
router.get('/get-all-users', getAllUsersController);
router.get('/filtered-users', authMiddleware, searchUserByNameController);


module.exports = router;