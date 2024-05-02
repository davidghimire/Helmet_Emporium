import React, { Fragment, useState } from 'react';
import './RentShipping.css';
import { useSelector, useDispatch } from 'react-redux';
import FaceIcon from '@material-ui/icons/Face';
import { rentSaveShippingInfo } from '../../../actions/rentAction';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@material-ui/icons/Phone';
import { useAlert } from 'react-alert';
import CheckoutSteps from '../../Cart/CheckoutSteps';
import { Navbar } from '../Homepage/Navbar';

const RentShipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [firstName, setName] = useState(user.firstName);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [contact, setContact] = useState(shippingInfo.contact || user.contact);
  const [province, SetProvince] = useState(
    shippingInfo.province || 'Bagmati Province'
  );
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (contact.length < 10 || contact.length > 10) {
      alert.error('Phone Number should be 10 digit Long');
      return;
    }
    dispatch(
      rentSaveShippingInfo({
        firstName,
        address,
        city,
        contact,
        province,
        shippingInfo,
      })
    );
    navigate('/rent/details');
  };
  return (
    <Fragment>
      <Navbar />
      <CheckoutSteps activeStep={0} />
      <div className="rentShippingContainer">
        <div className="rentShippingBox">
          <h2 className="rentShippingHeading">Shipping Details</h2>
          <form
            className="rentShippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="rentShhpingAddress">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="firstName"
                value={user.firstName}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="rentShhpingAddress">
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                value={contact}
                required
                onChange={(e) => setContact(e.target.value)}
                size="10"
              />
            </div>

            <div className="rentShhpingAddress">
              <LocationCityIcon />
              <input
                type="text"
                placeholder="Province"
                value={province}
                required
                readOnly
                onChange={(e) => SetProvince(e.target.value)}
              />
            </div>
            <div className="rentShhpingAddress">
              <LocationCityIcon />
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="city">Select City</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>
            <div className="rentShhpingAddress">
              <HomeIcon />
              <input
                type="text"
                placeholder="Shipping Full Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Next"
              className="rentShippingBtn"
              disabled={address ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RentShipping;
