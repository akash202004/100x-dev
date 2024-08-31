const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllAccountsController, getBalanceController, transferController } = require('../controllers/accountController');

// router
const router = express.Router();

// routes
router.get('/get-all-acc', authMiddleware, getAllAccountsController);
router.get('/balance', authMiddleware, getBalanceController);
router.post('/transfer', authMiddleware, transferController);

module.exports = router;