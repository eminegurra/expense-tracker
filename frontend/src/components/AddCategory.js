import React, { useState } from 'react';

function AddCategory({ onCategoryAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCategoryAdded(name);
    setName('');
  };

  return (
    <div className="form-container">
      <h3>Add New Category</h3>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name (e.g., Food)"
          className="form-input"
        />
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;