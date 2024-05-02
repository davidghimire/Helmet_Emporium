import React from 'react';
import { Link } from 'react-router-dom';

import './categoryCard.css';

export const CategoryCard = ({ category }) => {
  return (
    <Link className="categoryCard" to={`/category/${category.title}`}>
      <img src={category?.image[0]?.url} alt={category.title} />
      <p>{category.title}</p>
    </Link>
  );
};
