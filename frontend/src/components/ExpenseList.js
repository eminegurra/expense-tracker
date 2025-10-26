import React from 'react';

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses yet. Add one above!</p>;
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <h3>Expenses</h3>
      <div className="total-display">Total: ${total.toFixed(2)}</div>
      <div className="expense-list">
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-item">
            <div className="expense-details">
              <strong>{expense.categoryId?.name || 'Unknown'}</strong>
              <p>{expense.description}</p>
              <small>{new Date(expense.createdAt).toLocaleDateString()}</small>
            </div>
            <div className="expense-actions">
              <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onDelete(expense._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;