import React, { useEffect, useState, Fragment } from 'react';
import Product from '../Products/Product';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './categoryproduct.css';
import { Navbar } from '../Homepage/Navbar';
export const CategoryProduct = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);

  const cat = useParams().cat;

  console.log(cat);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/category/products/${cat}`
        );
        setCategoryProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [cat]);
  return (
    <Fragment>
      <Navbar />
      <div className="categoryProducts">
        {categoryProduct.map((product) => (
          <Product
            key={product._id}
            product={product}
            className="productCard"
          />
        ))}
      </div>
    </Fragment>
  );
};
