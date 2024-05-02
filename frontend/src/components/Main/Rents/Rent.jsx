import React from 'react';
import { Link } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './rent.css';

const Product = ({ rent }) => {
  return (
    <Link className="rentCard" to={`/rent/${rent._id}`}>
      <img src={rent.images[0].url} alt={rent.name} />
      <p>{rent.name}</p>
      <span>{`Rs.${rent.price}`} per/hr</span>
      {/* <div className="spec">
        <AccessTimeIcon />
        <BoltIcon />
      </div>
      <div className="spec">
        <p>{`${rent.kilometer}KM`}</p>
        <p>{`${rent.power}CC`}</p>
      </div> */}
    </Link>
  );
};

export default Product;
