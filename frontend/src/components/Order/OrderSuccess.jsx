import React, { Fragment } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './success.css';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Cart/CheckoutSteps';
import { Navbar } from '../Main/Homepage/Navbar';

export const OrderSuccess = () => {
  return (
    <Fragment>
      <Navbar /> <CheckoutSteps activeStep={2} />
      <div className="successOrder">
        <CheckCircleIcon />
        <p>Your order has been placed successfully</p>
        <Link to="/order" style={{ textDecoration: 'none' }}>
          <button>View Orders</button>
        </Link>
      </div>
    </Fragment>
  );
};
