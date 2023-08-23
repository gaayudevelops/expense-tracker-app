const express = require('express');

const premiumController = require('../controllers/premium');

const userauthentication = require('../middleware/auth')

const router = express.Router();

// Get leaderboard => GET
router.get('/showleaderboard', userauthentication.authenticate, premiumController.getUserLeaderboard);

// Add expense => POST
// router.post('/updatetransactionstatus', userauthentication.authenticate, purchaseController.postUpdateTransactionStatus);


module.exports = router;