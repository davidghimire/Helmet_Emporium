import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './RentDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getRentDetails } from '../../../actions/rentAction';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../Homepage/Navbar';
import { useAlert } from 'react-alert';
import { DatePicker } from 'antd';
import { DateTime } from 'luxon';
const { RangePicker } = DatePicker;
export const RentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { rent, loading, error } = useSelector((state) => state.rentDetails);
  const params = useParams();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getRentDetails(params.id));
  }, [dispatch, params.id]);

  const selectTimeSlots = (values) => {
    if (values && values.length === 2) {
      const [startDate, endDate] = values;
      setFrom(
        DateTime.fromJSDate(startDate.toDate()).toFormat('MMM dd yyyy HH:mm')
      );
      setTo(
        DateTime.fromJSDate(endDate.toDate()).toFormat('MMM dd yyyy HH:mm')
      );
      setTotalDays(endDate.diff(startDate, 'Days'));
    } else {
      setFrom('');
      setTo('');
      setTotalDays(0);
    }
  };
  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < DateTime.local().startOf('day');
  };

  const checkoutHandler = () => {
    if (user) {
      localStorage.setItem('totalDays', totalDays);
      localStorage.setItem('subTotal', rent.price * totalDays);
      if (rent.stock !== 0) {
        navigate('/rent/shipping');
      }
    } else {
      // alert.error('Please Login to access this resouces');
      navigate('/login');
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="single-product-main-content">
        <div className="single-product-page">
          <div className="left">
            <Carousel>
              {rent.images &&
                rent.images.map((item, i) => (
                  <img
                    key={item.url}
                    className="carousel-image"
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div className="right">
            <h1 className="product-title">{rent.name}</h1>
            <h2 className="product-price">{`Rs ${rent.price}`} per/day</h2>
            <p className="product-description">{rent.description}</p>
            <p>
              Status:
              <b className={rent.stock < 1 ? 'redColor' : 'greenColor'}>
                {rent.stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlots}
              disabledDate={disabledDate}
            />
            <div>
              <p>Total Days: {totalDays}</p>
            </div>
            <div>
              <h2>Total Amount: {rent.price * totalDays}</h2>
            </div>

            <div className="cart-buttons">
              <button
                className="add-to-cart-button"
                onClick={checkoutHandler}
                disabled={totalDays ? false : true}
              >
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
