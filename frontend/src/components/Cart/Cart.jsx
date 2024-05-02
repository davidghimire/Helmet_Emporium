import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemsFromCart } from '../../actions/cartAction';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../Main/Homepage/Navbar';
import { useAlert } from 'react-alert';

const Cart = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const deleteFromCart = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (user) {
      if (user.role === 'admin') {
        alert.error('You are not authorized to order items.');
        return;
      }
      navigate('/shipping');
    } else {
      // alert.error('Please Login to access this resouces');
      navigate('/login');
    }
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <Navbar />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Subtotal</p>
            </div>
            <div className="carts">
              {cartItems &&
                cartItems.map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteFromCart}
                    />
                    <p className="cartSubtotal">{`Rs.${item.price}`}</p>
                  </div>
                ))}
            </div>
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce(
                  (acc, item) => acc + item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
