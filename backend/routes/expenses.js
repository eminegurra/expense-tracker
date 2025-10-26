const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { sendBudgetAlert } = require('../services/emailService');

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });
    return res.status(200).json({ ok: true, data: expenses });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// POST create expense
router.post('/', async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body;
    
    if (!categoryId || !amount || !description) {
      return res.status(400).json({ 
        ok: false, 
        error: 'CategoryId, amount, and description are required' 
      });
    }

    const expense = new Expense({ categoryId, amount, description });
    await expense.save();

    // Check total expenses for budget alert
    const allExpenses = await Expense.find();
    const total = allExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const budgetLimit = process.env.BUDGET_LIMIT || 1000;

    if (total > budgetLimit) {
      try {
        await sendBudgetAlert(total, budgetLimit);
      } catch (emailError) {
        console.error('Email alert failed:', emailError.message);
      }
    }
    
    return res.status(201).json({ ok: true, data: expense });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const expense = await Expense.findByIdAndDelete(id);
    
    if (!expense) {
      return res.status(404).json({ ok: false, error: 'Expense not found' });
    }
    
    return res.status(200).json({ ok: true, data: expense });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;