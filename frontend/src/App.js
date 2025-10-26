import React, { useState, useEffect } from 'react';
import AddCategory from './components/AddCategory';
import CategoryList from './components/CategoryList';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import * as api from './services/api';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesRes, expensesRes] = await Promise.all([
        api.getCategories(),
        api.getExpenses()
      ]);
      
      if (categoriesRes.ok) setCategories(categoriesRes.data);
      if (expensesRes.ok) setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data. Make sure backend is running on port 5000!');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAdded = async (name) => {
    try {
      const result = await api.createCategory(name);
      if (result.ok) {
        setCategories([...categories, result.data]);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
    }
  };

  const handleExpenseAdded = async (categoryId, amount, description) => {
    try {
      const result = await api.createExpense(categoryId, amount, description);
      if (result.ok) {
        setExpenses([result.data, ...expenses]);
        alert('Expense added! Check your email if total exceeds budget.');
      }
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Failed to create expense');
    }
  };

  const handleExpenseDeleted = async (id) => {
    try {
      const result = await api.deleteExpense(id);
      if (result.ok) {
        setExpenses(expenses.filter(exp => exp._id !== id));
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      
      <AddCategory onCategoryAdded={handleCategoryAdded} />
      <CategoryList categories={categories} />
      
      <hr />
      
      <AddExpense categories={categories} onExpenseAdded={handleExpenseAdded} />
      <ExpenseList expenses={expenses} onDelete={handleExpenseDeleted} />
    </div>
  );
}

export default App;