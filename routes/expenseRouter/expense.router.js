const express = require('express');
const router = express.Router();
const { createExpense ,  getAllExpense , updateExpenseById , deleteExpenseById  , getExpenseById    } = require('../../controllers/expenses/expenses');

router.route('/').post(createExpense).get(getAllExpense);
router.route('/:expenseId').get(getExpenseById).patch(updateExpenseById).delete(deleteExpenseById);

module.exports = router;
