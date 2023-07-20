const User = require("../../models/User/User");
const Expense = require("../../models/Expense/Expense");

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.json({ expense });
  } catch (err) {
    console.log("Error in creating expense", err);
  }
};

const getAllExpense = async (req, res) => {
  try {
    const googleId = req.header("Authorization");
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const allExpenses = await Expense.find({ userId: user._id });
    res.json({ allExpenses });
  } catch (err) {
    console.log("Error in getting expenses for the user", err);
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    const expense = await Expense.findById({ _id: expenseId });

    if (!expense) {
      return res.status(404).send({ error: `Expense with id ${expenseId} does not exist` });
    }

    res.json({ expense });
  
  } catch (err) {
    console.log("Error in getting expense by id", err);
  }
};

const updateExpenseById = async (req, res) => {
  try {
    const {
      params: { expenseId },
      body: { userId, description, amount, category, createdAt },
    } = req;

    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        userId,
        description,
        amount,
        category,
        createdAt,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
   
    if (!expense) {
      return res.status(404).send({ error: `Expense with id ${expenseId} does not exist` });
    }

    res.json({ expense });
  } catch (err) {
    console.log("Error in updating expense:", err);
    res.status(500).send({ error: "Error in updating expense" });
  }
};


const deleteExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;

    const expense = await Expense.findByIdAndDelete({ _id: expenseId });
  
    if (!expense) {
      return res.status(404).send({ error: `Expense with id ${expenseId} does not exist` });
    }
    res.json( `Expense deleted successfully with id ${expenseId} !`);
    
  } catch (err) {
    console.log("Error in deleting expense by id", err);
  }
};


module.exports = {
  createExpense,
  getAllExpense,
  updateExpenseById,
  getExpenseById,
  deleteExpenseById,
};
