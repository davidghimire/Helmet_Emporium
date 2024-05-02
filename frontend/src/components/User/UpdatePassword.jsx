import React, { Fragment, useState, useEffect } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import './updatePassword.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Main/Loader/Loader';
import { Navbar } from '../Main/Homepage/Navbar';
import { useAlert } from 'react-alert';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError(' Password should be at least 8 Characters');
    }
    if (confirmPassword.length < 8) {
      setConfirmPasswordError(' Password should be at least 8 Characters');
    }

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password Updated Successfully');
      navigate('/account');
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);
  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="updatepass">Update Profile</h1>
          <div className="updateMainPassword">
            <div className="updatePassword">
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="passwords">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    name="password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    value={oldPassword}
                    required
                    className="input"
                  />
                </div>
                <div className="passwords">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                    className="input"
                  />
                </div>
                {passwordError && (
                  <div
                    style={{
                      fontSize: '0.5rem',
                      alignItems: 'flex-start',
                      color: 'red',
                    }}
                  >
                    {passwordError}
                  </div>
                )}
                <div className="passwords">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    className="input"
                  />
                </div>
                {confirmPasswordError && (
                  <div
                    style={{
                      fontSize: '0.5rem',
                      alignItems: 'flex-start',
                      color: 'red',
                    }}
                  >
                    {confirmPasswordError}
                  </div>
                )}
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
