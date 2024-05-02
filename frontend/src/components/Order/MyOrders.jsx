import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './myOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, myOrders, cancelOrder } from '../../actions/orderAction';
import Loader from '../Main/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Navbar } from '../Main/Homepage/Navbar';
import LaunchIcon from '@material-ui/icons/Launch';

export const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, myorders } = useSelector((state) => state.myOrders);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelOrder = () => {
    setOpenDialog(true);
  };

  const handleConfirmCancel = (orderId) => {
    setOpenDialog(false);
    dispatch(cancelOrder(orderId));
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const orderId = params.getValue(params.id, 'id');
        const orderStatus = params.getValue(params.id, 'status');

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/order/${orderId}`}>
              <LaunchIcon />
            </Link>
            {orderStatus !== 'Cancelled' && (
              <Fragment>
                <IconButton onClick={handleCancelOrder}>
                  <CancelIcon />
                </IconButton>
                <Dialog open={openDialog} onClose={handleCancel}>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to cancel this order?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                      onClick={() => handleConfirmCancel(orderId)}
                      color="primary"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Fragment>
            )}
          </div>
        );
      },
    },
  ];
  const rows = [];

  myorders &&
    myorders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
