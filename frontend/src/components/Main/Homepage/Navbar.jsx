import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  InputBase,
  Badge,
  MenuItem,
  Button,
  Select,
} from '@mui/material';
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone';
import { ShoppingCart, Login } from '@mui/icons-material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import imge from '../../ImagesDisplayed/logo.png';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#FF4B3E',
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(45),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;
export const Navbar = () => {
  // new added
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.user);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };
  const logoutHand = () => {
    dispatch(logout());
    alert.success('Logged out Successfully');
  };
  const firstName = `${user && user.firstName}`;

  //new added

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  //new added
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user
        ? [
            user && user.role !== 'admin' ? (
              <Link
                to="/order"
                style={{ textDecoration: 'none', color: 'black' }}
                key="orders"
              >
                <MenuItem>Orders</MenuItem>
              </Link>
            ) : (
              <Link
                to="/admin/dashboard"
                style={{ textDecoration: 'none', color: 'black' }}
                key="dashboard"
              >
                <MenuItem>Dashboard</MenuItem>
              </Link>
            ),
            <Link
              to="/account"
              style={{ textDecoration: 'none', color: 'black' }}
              key="account"
            >
              <MenuItem>My account</MenuItem>
            </Link>,
            <Link
              to="/"
              onClick={logoutHand}
              style={{ textDecoration: 'none', color: 'black' }}
              key="logout"
            >
              <MenuItem>Logout</MenuItem>
            </Link>,
          ]
        : !loading && (
            <Link to="/login">
              <Login />
            </Link>
          )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky" style={{ maxHeight: '50px' }}>
      <StyledToolbar>
        <Text
          variant="h5"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          onClick={() => navigate('/')}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={imge} style={{ width: '100px' }} />
          </Link>
        </Text>
        {/* <TwoWheelerTwoToneIcon sx={{ display: { xs: 'block', sm: 'none' } }} /> */}

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onChange={(e) => setKeyword(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button onClick={searchSubmitHandler}> Submit</Button>
        </Search>
        <Icons>
          <Badge>
            <Link to="/cart">
              <Badge badgeContent={`${cartItems.length}`} color="primary">
                <ShoppingCart sx={{ fontSize: '25px' }} />
              </Badge>
            </Link>
          </Badge>
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}></UserBox>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
          <MenuItem> {user?.firstName}</MenuItem>
        </IconButton>
      </StyledToolbar>
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};
