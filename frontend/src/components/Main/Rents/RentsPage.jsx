import React, { Fragment, useEffect, useState } from 'react';
import './RentsPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getRentProduct } from '../../../actions/rentAction';
import Loader from '../Loader/Loader';
import Rent from '../Rents/Rent';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Navbar } from '../Homepage/Navbar';
export const RentsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const params = useParams();
  const { rents, loading, error, rentsCount, resultPerPage } = useSelector(
    (state) => state.rents
  );
  const keyword = params.keyword;
  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const pricehandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    dispatch(getRentProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="rentsHeading"> Rent Products</h2>
          <div className="rents">
            {rents && rents.map((rent) => <Rent key={rent._id} rent={rent} />)}
          </div>

          <div className="filterBox_rent">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={pricehandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}
            />
          </div>

          {resultPerPage < rentsCount && (
            <div className="paginationBox_rent">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={rentsCount}
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
