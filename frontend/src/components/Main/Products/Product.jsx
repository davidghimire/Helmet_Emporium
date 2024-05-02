import React from 'react';
import { Link } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './product.css';

const Product = ({ product }) => {
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product?.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>
      <span>{`Rs.${product.price}`}</span>
      {/* <div className="spec">
        <AccessTimeIcon />
        <BoltIcon />
      </div>
      <div className="spec">
        {/* <p>{`${product.kilometer}KM`}</p>
        <p>{`${product.power}CC`}</p> 
      </div> */}
    </Link>
  );
};

export default Product;
