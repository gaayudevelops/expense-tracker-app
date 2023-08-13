const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

// Get expenses => GET
router.get('/get-expenses', expenseController.getExpenses);

// Add expense => POST
router.post('/add-expense', expenseController.postAddExpense);

// delete expense => DELELTE
router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;