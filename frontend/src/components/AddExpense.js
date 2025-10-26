import React, { useState } from 'react';

function AddExpense({ categories, onExpenseAdded }) {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || !amount || !description) {
      alert('Please fill all fields');
      return;
    }

    onExpenseAdded(categoryId, parseFloat(amount), description);
    setCategoryId('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="form-container">
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit} className="form-vertical">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-select"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (e.g., 25.50)"
          className="form-input"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (e.g., Lunch)"
          className="form-input"
        />

        <button type="submit" className="btn btn-success">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;