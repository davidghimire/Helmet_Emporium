import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Avatar } from '@mui/material';
import moment from 'moment';
import { Fragment } from 'react';
import './profile.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Main/Loader/Loader';
import { Navbar } from '../Main/Homepage/Navbar';

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const date = moment(user?.createdAt);
  const formattedDate = date.format('MMM D, YYYY');

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <h1 className="account">My Account</h1>

          <div className="mainProfile">
            <div className="profile">
              <Avatar src={user.avatar?.url} sx={{ width: 100, height: 100 }} />
              <span className="userFullname">
                @{user?.firstName} {user?.lastName}
                {user?.isVerified && <VerifiedIcon color="primary" />}
              </span>
              <div className="userInfo">
                <span className="aDetails"> Account Details </span>
                <span className="items">
                  <EmailIcon />
                  <span className="data"> {user?.email} </span>
                </span>
                <span className="items">
                  <LocationCityIcon />
                  <span className="data"> {user?.address} </span>
                </span>
                <span className="items">
                  <SmartphoneIcon />
                  <span className="data"> {user?.contact} </span>
                </span>
                <span className="dateDetail"> Joined {formattedDate} </span>
              </div>
              <div className="editDetails">
                <Link to="/me/update" style={{ textDecoration: 'none' }}>
                  <button className="edit">Edit</button>
                </Link>
                <Link to="/order" style={{ textDecoration: 'none' }}>
                  <button className="edit">Order</button>
                </Link>
                <Link to="/password/update" style={{ textDecoration: 'none' }}>
                  <button className="edit">Change Password</button>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserProfile;
