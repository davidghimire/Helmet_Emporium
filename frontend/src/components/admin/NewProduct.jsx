import React, { Fragment, useEffect, useState } from 'react';
import './newProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
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
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categories } = useSelector((state) => state.categories);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState('');
  // const [Kilometer, setKilometer] = useState('');
  // const [power, setPower] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Product Creates Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    console.log(images);
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('stock', stock);
    myForm.set('description', description);
    // myForm.set('kilometer', Kilometer);
    // myForm.set('power', power);
    myForm.set('category', category);
    console.log(images);
    images.forEach((image) => {
      myForm.append('images', image);
    });
    dispatch(createProduct(myForm));
  };
  const createProductImagesChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    // setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      // const reader = new FileReader();
      // reader.onload = () => {
      //   if (reader.readyState === 2) {
      //     setImagesPreview((old) => [...old, reader.result]);
      //   }
      // };
      // reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
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
            {/* <div>
              <AccessTimeIcon />
              <input
                type="number"
                placeholder="Kilometers Done"
                required
                value={Kilometer}
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
            </div> */}

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
                onChange={createProductImagesChange}
                multiple
              />
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

export default NewProduct;
