import { React, Fragment, useState, useEffect } from 'react';
import SideBar from './Sidebar';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { Button } from '@material-ui/core';
import './CreateCategory.css';
import { useSelector, useDispatch } from 'react-redux';
import { createCategory, clearErrors } from '../../actions/categoryAction';
import { useAlert } from 'react-alert';
import { NEW_CATEGORY_RESET } from '../../constants/categoryConstants';
export const CreateCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector(
    (state) => state.createCategory
  );
  const [title, setTitle] = useState('');
  const [images, setImages] = useState();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Category Creates Successfully');
      //navigate('/admin/dashboard');
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();
    console.log(images);
    const myForm = new FormData();
    myForm.set('title', title);

    myForm.append('image', images);

    dispatch(createCategory(myForm));
  };
  const createProductImagesChange = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    console.log(files);
    setImages(files);
  };
  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="categoryContainer">
          <form
            className="categoryProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <h1>Create Category</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Category Name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div id="categoryProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
              />
            </div>
            <Button
              id="categoryProductBtn"
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
