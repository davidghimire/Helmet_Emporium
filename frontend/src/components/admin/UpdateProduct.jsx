import React, { Fragment, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import InventoryIcon from '@mui/icons-material/Inventory';
import BoltIcon from '@mui/icons-material/Bolt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, error } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.products);
  console.log(isUpdated);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState('');
  const [kilometer, setKilometer] = useState('');
  const [power, setPower] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);
  const productId = params.id;
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setKilometer(product.kilometer);
      setPower(product.power);
      setCategory(product.category);
      setOldImages(product.oldImages);
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
      alert.success('Product Updated Successfully');
      navigate('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    productId,
    product,
    navigate,
    updateError,
  ]);

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
    myForm.set('category', category);
    console.log(images);
    images.forEach((image) => {
      myForm.append('images', image);
    });

    // for (let data of myForm.entries()) {
    //   console.log(data);
    // }
    dispatch(updateProduct(productId, myForm));
    alert.success('Product Updated Successfully');
    navigate('/admin/products');
    dispatch({ type: UPDATE_PRODUCT_RESET });
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
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Choose Category</option>
                {categories &&
                  categories.map((option) => (
                    <option key={option._id} value={option.title}>
                      {option.title}
                    </option>
                  ))}
              </select>
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

export default UpdateProduct;
