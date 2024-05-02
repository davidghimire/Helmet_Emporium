import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, login } from '../../actions/userAction';
import Loader from '../Main/Loader/Loader';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLogin] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  // const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success('Login Successfully');
      navigate('/');
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);
  const queryParams = new URLSearchParams(location.search);
  const verified = queryParams.get('verified');
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              {verified && (
                <p className={styles.verified_message}>
                  Email verified. You can now login.
                </p>
              )}
              <form className={styles.form_container} onSubmit={loginSubmit}>
                <h1>Login to Your Account</h1>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLogin(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={styles.input}
                />

                <Link to="/password/forgot" style={{ alignSelf: 'flex-start' }}>
                  <p style={{ padding: '0 12px' }}>Forgot Password ?</p>
                </Link>
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Sign In
                </button>
              </form>
            </div>
            <div className={styles.right}>
              <h1>New Here ?</h1>
              <Link to="/signup">
                <button type="button" className={styles.white_btn}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
