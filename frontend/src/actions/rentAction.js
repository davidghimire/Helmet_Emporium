import axios from 'axios';
import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  ALL_RENT_REQUEST_HOME,
  ALL_RENT_SUCCESS_HOME,
  ALL_RENT_FAIL_HOME,
  RENT_DETAILS_REQUEST,
  RENT_DETAILS_SUCCESS,
  RENT_DETAILS_FAIL,
  RENT_SAVE_SHIPPING_INFO,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  ADMIN_RENT_REQUEST,
  ADMIN_RENT_SUCCESS,
  ADMIN_RENT_FAIL,
  UPDATE_RENT_REQUEST,
  UPDATE_RENT_SUCCESS,
  UPDATE_RENT_FAIL,
  DELETE_RENT_REQUEST,
  DELETE_RENT_SUCCESS,
  DELETE_RENT_FAIL,
  CLEAR_ERRORS,
} from '../constants/rentConstants';

//create product --ADMIN
export const createRent = (rentData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(
      `/api/v1/admin/rent/new`,
      rentData,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all rent --products
export const getRentProduct =
  (keyword = '', currentPage = 1, price = [0, 200000]) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_RENT_REQUEST,
      });
      const { data } = await axios.get(
        `/api/v1/rents?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      );

      dispatch({
        type: ALL_RENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_RENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get all rent product -- home
export const getRentProductHome = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_RENT_REQUEST_HOME,
    });
    const { data } = await axios.get('/api/v1/rent');

    dispatch({
      type: ALL_RENT_SUCCESS_HOME,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_RENT_FAIL_HOME,
      payload: error.response.data.message,
    });
  }
};

//rent details
export const getRentDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RENT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/rent/${id}`);

    dispatch({
      type: RENT_DETAILS_SUCCESS,
      payload: data.rent,
    });
  } catch (error) {
    dispatch({
      type: RENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update product --ADMIN
export const updateRent = (id, rentData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_RENT_REQUEST,
    });
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.put(
      `/api/v1/admin/rent/${id}`,
      rentData,
      config
    );

    dispatch({
      type: UPDATE_RENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Save shipping Info
export const rentSaveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: RENT_SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem('rentShippingInfo', JSON.stringify(data));
};

// Get all products for Admin
export const getAdminRent = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_RENT_REQUEST });
    const { data } = await axios.get('/api/v1/admin/rent/products');
    dispatch({
      type: ADMIN_RENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_RENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete product --ADMIN
export const deleteRent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_RENT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/rent/${id}`);

    dispatch({
      type: DELETE_RENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_RENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearing Erros
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
