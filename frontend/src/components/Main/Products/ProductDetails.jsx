import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../../actions/productAction';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from '../../../actions/cartAction';
import { Navbar } from '../Homepage/Navbar';
import { useAlert } from 'react-alert';
export const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const params = useParams();

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(params.id));
    alert.success('Item Added to Cart');
  };

  return (
    <Fragment>
      <Navbar />
      <div className="single-product-main-content">
        <div className="single-product-page">
          <div className="left">
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    key={item.url}
                    className="carousel-image"
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div className="right">
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-price">{`Rs ${product.price}`}</h2>

            <p className="product-description">{product.description}</p>
            <p>
              Status:
              <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                {product.stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
            <div className="cart-buttons">
              <button
                className="add-to-cart-button"
                onClick={addToCartHandler}
                disabled={product.stock === 0}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
