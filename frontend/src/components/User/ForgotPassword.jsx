import React, { Fragment, useState, useEffect } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './ForgotPassword.css';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '../Main/Homepage/Navbar';
import { useAlert } from 'react-alert';
import { clearErrors, forgotPassword } from '../../actions/userAction';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState('');
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('email', email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      <Navbar />
      <h1 className="forgotpass">Forgot Password</h1>
      <div className="forgotMainPassword">
        <div className="forgotPassword">
          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="updatePasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                className="inputs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
