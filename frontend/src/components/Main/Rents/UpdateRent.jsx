import React, { Fragment, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateRent,
  getRentDetails,
} from '../../../actions/rentAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import InventoryIcon from '@mui/icons-material/Inventory';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from '../../admin/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

import { UPDATE_RENT_RESET } from '../../../constants/rentConstants';

export const UpdateRent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { rent, error } = useSelector((state) => state.rentDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.rents);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState('');
  const [kilometer, setKilometer] = useState('');
  const [power, setPower] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const rentId = params.id;
  useEffect(() => {
    if (rent && rent._id !== rentId) {
      dispatch(getRentDetails(rentId));
    } else {
      setName(rent.name);
      setPrice(rent.price);
      setDescription(rent.description);
      setStock(rent.stock);
      setKilometer(rent.kilometer);
      setPower(rent.power);
      setOldImages(rent.oldImages);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Rent Updated Successfully');
      navigate('/admin/rent/products');
      dispatch({ type: UPDATE_RENT_RESET });
    }
  }, [dispatch, alert, error, isUpdated, rentId, rent, navigate, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    console.log(images);
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('stock', stock);
    myForm.set('description', description);
    myForm.set('kilometer', kilometer);
    myForm.set('power', power);
    console.log(images);
    images.forEach((image) => {
      myForm.append('images', image);
    });

    // for (let data of myForm.entries()) {
    //   console.log(data);
    // }
    dispatch(updateRent(rentId, myForm));
    alert.success('Product Updated Successfully');
    navigate('/admin/rent/products');
    dispatch({ type: UPDATE_RENT_RESET });
  };
  const updateProductImagesChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    setOldImages([]);
  };
  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <InventoryIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                readOnly
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <AccessTimeIcon />
              <input
                type="number"
                placeholder="Kilometers Done"
                required
                value={kilometer}
                onChange={(e) => setKilometer(e.target.value)}
              />
            </div>
            <div>
              <BoltIcon />
              <input
                type="number"
                placeholder="CC"
                required
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
