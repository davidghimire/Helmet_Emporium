import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCategory,
  getAllCategory,
  clearErrors,
} from '../../actions/categoryAction';
import SideBar from './Sidebar';
import DeleteIcon from '@material-ui/icons/Delete';

import { Button } from '@material-ui/core';
import { CATEGORY_DELETE_RESET } from '../../constants/categoryConstants';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
export const CategoryList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { categories, error } = useSelector((state) => state.categories);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.categories
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteCategory(id));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success('Category Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: CATEGORY_DELETE_RESET });
    }
    dispatch(getAllCategory());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: 'title',
      headerName: 'title',
      minWidth: 350,
      flex: 0.5,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 0.2,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  categories &&
    categories.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Category</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};
