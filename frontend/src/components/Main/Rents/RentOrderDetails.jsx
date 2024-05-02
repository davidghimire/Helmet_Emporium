import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from '../../Cart/CheckoutSteps';
import { useSelector } from 'react-redux';
import './RentOrderDetails.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Navbar } from '../Homepage/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayButton } from '../../Khalti/PayButton';
export const RentOrderDetails = () => {
  const navigate = useNavigate();
  const { rentShippingInfo, rent } = useSelector((state) => state.rentDetails);
  const { user } = useSelector((state) => state.user);
  const [subtotal, setSubTotal] = useState();
  const [order, setOrder] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setSubTotal(localStorage.getItem('subTotal'));
  }, []);

  const shippingCharges = subtotal > 1000 ? 0 : 50;
  const parsedSubtotal = parseFloat(subtotal);
  const parsedShippingCharges = parseFloat(shippingCharges);
  const calculatedTotalPrice = parsedSubtotal + parsedShippingCharges;

  useEffect(() => {
    setTotalPrice(calculatedTotalPrice);
  }, [subtotal]);

  useEffect(() => {
    const orderObject = {
      shippingInfo: {
        firstName: rentShippingInfo.firstName,
        address: rentShippingInfo.address,
        city: rentShippingInfo.city,
        province: rentShippingInfo.province,
        contact: rentShippingInfo.contact,
      },
      orderItems: {
        name: rent.name,
        price: rent.price,
        stock: rent.stock,
        image: rent?.images?.[0]?.url,
        product: rent._id,
        productType: 'rent',
      },

      totalPrice: totalPrice,
      orderStatus: 'processing',
    };
    setOrder(orderObject);
  }, [totalPrice]);
  return (
    <Fragment>
      <Navbar />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>{user.firstName}'s Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.firstName}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{rentShippingInfo.contact}</span>
              </div>
              <div>
                <p>City:</p>
                <span>{rentShippingInfo.city}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{rentShippingInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Rent Items:</Typography>
            <div className="confirmCartItemsContainer">
              {rent.images &&
                rent.images.map((item) => (
                  <div key={item.url}>
                    <img src={item.url} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {rent.name}
                    </Link>{' '}
                    <span>
                      <b>Rs.{rent.price} per/day</b>
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
                <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <PayButton order={order} user={user} totalPrice={totalPrice}>
              Proceed To Payment
            </PayButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
