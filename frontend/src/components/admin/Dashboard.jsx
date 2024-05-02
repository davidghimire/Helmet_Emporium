import { Fragment, React, useEffect } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { Navbar } from '../Main/Homepage/Navbar';
//import { Doughnut, Line } from 'react-chartjs-2';
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { rents } = useSelector((state) => state.rents);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  // const lineState = {
  //   lables: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'TOTAL AMOUNT',
  //       backgroundcolor: ['tomato'],
  //       hoverBackgroundColor: ['rgb(197,72,49)'],
  //       data: [0, 4000],
  //     },
  //   ],
  // };
  return (
    <Fragment>
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Helmet Emporium
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Buy Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/rent/products">
                <p>rent Product</p>
                <p>{rents && rents.length}</p>
              </Link>

              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>

              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
          {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
