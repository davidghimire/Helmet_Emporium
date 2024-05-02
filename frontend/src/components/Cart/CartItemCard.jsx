import React from 'react';
import './cartItemCard.css';
import { Link } from 'react-router-dom';

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="sp" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`X ${item.stock}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
