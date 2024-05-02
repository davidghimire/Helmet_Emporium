import React, { Fragment, useState, useEffect } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import './updateProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Main/Loader/Loader';
import { Navbar } from '../Main/Homepage/Navbar';
import { useAlert } from 'react-alert';
import { clearErrors, updateProfile, loadUser } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('firstName', firstName);
    myForm.set('lastName', lastName);
    myForm.set('email', email);
    myForm.set('address', address);
    myForm.set('contact', contact);
    if (avatar) {
      myForm.set('avatar', avatar);
    }
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setContact(user.contact);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Profile Updated Successfully');
      dispatch(loadUser());

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="update">Update Profile</h1>
          <div className="updateMainProfile">
            <div className="updateProfile">
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                <span className="aDetails"> Edit Details </span>
                <div className="updateProfileFirstName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    required
                    className="input"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileLastName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    required
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    readOnly
                    className="input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfileNumber">
                  <PhoneIcon />
                  <input
                    type="number"
                    placeholder="Contact"
                    name="contact"
                    value={contact}
                    required
                    className="input"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="updateProfileAddress">
                  <BusinessIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={address}
                    required
                    className="input"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
