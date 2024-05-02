import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './RentList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminRent,
  deleteRent,
} from '../../../actions/rentAction';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from '../../admin/Sidebar';
import { DELETE_RENT_RESET } from '../../../constants/rentConstants';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export const RentList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, rents } = useSelector((state) => state.rents);
  const { error: deleteError, isDeleted } = useSelector((state) => state.rents);
  const deleteProductHandler = (id) => {
    dispatch(deleteRent(id));
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
      alert.success('Product Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_RENT_RESET });
    }
    dispatch(getAdminRent());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 0.5,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 270,
      flex: 0.3,
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
            <Link to={`/admin/rent/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>
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

  rents &&
    rents.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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
