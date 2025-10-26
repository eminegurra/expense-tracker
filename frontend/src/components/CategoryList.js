import React from 'react';

function CategoryList({ categories }) {
  if (categories.length === 0) {
    return <p className="empty-state">No categories yet. Add one above!</p>;
  }

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <div className="category-tags">
        {categories.map((category) => (
          <div key={category._id} className="category-tag">
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;