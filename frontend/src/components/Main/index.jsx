import { Navbar } from './Homepage/Navbar';
import { Box } from '@mui/material';
import { Feed } from './Homepage/Feed';
import Footer from './Homepage/Footer';
import Product from './Products/Product';
import Rent from './Rents/Rent';
import MetaData from './Products/MetaData';
import { getProductHome } from '../../actions/productAction';
import { getRentProductHome } from '../../actions/rentAction';
import './Index.css';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useRef } from 'react';
import Loader from './Loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { CategoryCard } from './Category/CategoryCard';

const Main = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  const { rents } = useSelector((state) => state.rents);
  const { categories } = useSelector((state) => state.categories);
  const buyTab = useRef(null);
  const rentTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === 'buy') {
      switcherTab.current.classList.add('shiftToNeutral');
      switcherTab.current.classList.remove('shiftToRight');

      rentTab.current.classList.remove('shiftToNeutralForm');
      buyTab.current.classList.remove('shiftToLeft');
    }
    if (tab === 'rent') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shiftToNeutral');

      rentTab.current.classList.add('shiftToNeutralForm');
      buyTab.current.classList.add('shiftToLeft');
    }
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductHome());
  }, [dispatch, error, alert]);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getRentProductHome());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <MetaData title="Helmet Emporium" />
          <Navbar />
          <Feed />
          <h2 className="homeHeading">Features Products</h2>
          <div className="container">
            <div>
              <div className="buy_rent_toggle">
                <p onClick={(e) => switchTabs(e, 'buy')}>BUY</p>
                <p onClick={(e) => switchTabs(e, 'rent')}>RENT</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <div className="buy" ref={buyTab}>
              {products &&
                products.map((product, index) => (
                  <Product product={product} key={index} />
                ))}
              <div className="view">
                <Link to="/products">View Products</Link>
              </div>
            </div>

            <div className="rent" ref={rentTab}>
              {rents &&
                rents.map((rent, index) => <Rent rent={rent} key={index} />)}

              <div className="view">
                <Link to="/rents">View Products</Link>
              </div>
            </div>
          </div>
          <h2 className="categoryHeading">Category</h2>
          <div className="category">
            {categories &&
              categories.map((category) => (
                <CategoryCard category={category} key={category._id} />
              ))}
          </div>
          <Footer />
        </Box>
      )}
    </Fragment>
  );
};

export default Main;
