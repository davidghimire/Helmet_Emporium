import React, { Fragment, useEffect, useState } from 'react';
import './ProductsPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../../actions/productAction';
import Loader from '../Loader/Loader';
import Product from '../Products/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Navbar } from '../Homepage/Navbar';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 6000000]);
  const params = useParams();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;
  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const pricehandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={pricehandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={6000000}
            />
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
