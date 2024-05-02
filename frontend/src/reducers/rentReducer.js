import {
  ALL_RENT_REQUEST,
  ALL_RENT_SUCCESS,
  ALL_RENT_FAIL,
  ALL_RENT_REQUEST_HOME,
  ALL_RENT_SUCCESS_HOME,
  ALL_RENT_FAIL_HOME,
  CLEAR_ERRORS,
  RENT_DETAILS_REQUEST,
  RENT_DETAILS_SUCCESS,
  RENT_DETAILS_FAIL,
  RENT_SAVE_SHIPPING_INFO,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_FAIL,
  ADMIN_RENT_REQUEST,
  ADMIN_RENT_SUCCESS,
  UPDATE_RENT_REQUEST,
  UPDATE_RENT_SUCCESS,
  UPDATE_RENT_FAIL,
  UPDATE_RENT_RESET,
  DELETE_RENT_REQUEST,
  DELETE_RENT_SUCCESS,
  DELETE_RENT_FAIL,
  DELETE_RENT_RESET,
  ADMIN_RENT_FAIL,
} from '../constants/rentConstants';

export const rentReducer = (state = { rents: [] }, action) => {
  switch (action.type) {
    case ALL_RENT_REQUEST:
    case ALL_RENT_REQUEST_HOME:
    case ADMIN_RENT_REQUEST:
      return {
        loading: true,
        rents: [],
      };

    case ALL_RENT_SUCCESS:
    case ALL_RENT_SUCCESS_HOME:
    case ADMIN_RENT_SUCCESS:
      return {
        loading: false,
        rents: action.payload.rents,
        rentsCount: action.payload.rentsCount,
      };

    case ALL_RENT_FAIL:
    case ALL_RENT_FAIL_HOME:
    case ADMIN_RENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const rentDetailsReducer = (
  state = { rent: {}, rentShippingInfo: {} },
  action
) => {
  switch (action.type) {
    case RENT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case RENT_DETAILS_SUCCESS:
      return {
        loading: false,
        rent: action.payload,
      };

    case RENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RENT_SAVE_SHIPPING_INFO:
      return {
        ...state,
        rentShippingInfo: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const newRentReducer = (state = { rent: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        rent: action.payload.rent,
      };

    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const DeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RENT_REQUEST:
    case UPDATE_RENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_RENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_RENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_RENT_FAIL:
    case UPDATE_RENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_RENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_RENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
