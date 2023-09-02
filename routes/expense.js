const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const userauthentication = require('../middleware/auth')

const router = express.Router();

// Get expenses => GET
router.get('/get-expenses', userauthentication.authenticate, expenseController.getExpenses);

// Add expense => POST
router.post('/add-expense', userauthentication.authenticate, expenseController.postAddExpense);

// delete expense => DELELTE
router.delete('/delete-expense/:id',userauthentication.authenticate, expenseController.deleteExpense);

module.exports = router;