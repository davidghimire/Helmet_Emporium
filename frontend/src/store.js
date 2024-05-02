import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  newProductReducer,
  productDetailsReducer,
  productReducer,
  DeleteProductReducer,
} from './reducers/productReducer';
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import {
  newRentReducer,
  rentDetailsReducer,
  rentReducer,
} from './reducers/rentReducer';
import {
  allOrderReducer,
  orderReducer,
  orderDetailsReducer,
  myOrdersReducer,
} from './reducers/orderReducer';
import {
  createCategoryReducer,
  getCategoryDetailsReducer,
  categoryUDReducer,
  categoryReducer,
} from './reducers/categoryReducer';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  deleteProduct: DeleteProductReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newRent: newRentReducer,
  rents: rentReducer,
  rentDetails: rentDetailsReducer,
  allOrders: allOrderReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  createCategory: createCategoryReducer,
  myOrders: myOrdersReducer,
  categoryDetails: getCategoryDetailsReducer,
  category: categoryUDReducer,
  categories: categoryReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
