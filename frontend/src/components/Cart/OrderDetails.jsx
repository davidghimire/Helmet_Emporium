import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { useSelector } from 'react-redux';
import './OrderDetails.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Navbar } from '../Main/Homepage/Navbar';
import { useNavigate } from 'react-router-dom';
import { PayButton } from '../Khalti/PayButton';
const OrderDetails = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCharges = subtotal > 10000 ? 10 : 50;
  const totalPrice = subtotal + shippingCharges;
  const address = `${shippingInfo.address}`;

  useEffect(() => {
    const orderObject = {
      shippingInfo: {
        firstName: shippingInfo.firstName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        province: shippingInfo.province,
        contact: shippingInfo.contact,
      },
      orderItems: cartItems,

      totalPrice: totalPrice,
      orderStatus: 'processing',
    };
    setOrder(orderObject);
  }, []);

  return (
    <Fragment>
      <Navbar />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>{user?.firstName}'s Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user?.firstName}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo?.contact}</span>
              </div>
              <div>
                <p>City:</p>
                <span>{shippingInfo?.city}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name} X {item.stock}
                    </Link>{' '}
                    <span>
                      <b>Rs.{item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs. {shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs.{totalPrice}</span>
            </div>

            <PayButton
              order={order}
              cartItems={cartItems}
              user={user}
              totalPrice={totalPrice}
            >
              Proceed To Payment
            </PayButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
