import React, { Fragment, useEffect, useState } from 'react';

import Loader from '../Loader/Loader';
import Product from '../Products/Product';
import { useParams } from 'react-router-dom';

import { Navbar } from '../Homepage/Navbar';
import axios from 'axios';

export const Search = () => {
  const params = useParams();

  const keyword = params.search;
  const [productList, setProductList] = useState();

  useEffect(() => {
    const getSearch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/products?keyword=${keyword}`
        );
        console.log(data.products);
        setProductList(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getSearch();
  }, [keyword]);

  return (
    <Fragment>
      <Navbar />

      <div>
        <h2 className="productsHeading">Products</h2>
        <div className="products">
          {productList &&
            productList.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};
