import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";
import { ORDER_PAY_FAIL, ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS, ORDER_PAY_RESET } from "../constants/orderConstants";
import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { ORDER_LIST_MY_REQUEST,
   ORDER_LIST_MY_SUCCESS,
   ORDER_LIST_MY_FAIL,
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DETAILS_FAIL,
   ORDER_DELIVER_FAIL,
  ORDER_LIST_FAIL, ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS} from "../constants/orderConstants";


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`http://alaic.pythonanywhere.com/api/orders/add/`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`http://alaic.pythonanywhere.com/api/orders/${id}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.message,
    });
  }
};


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try { 
    dispatch({
      type: ORDER_PAY_REQUEST,
    });
    
    const { 
      userLogin: { userInfo },   
    } = getState(); const 
    
    config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ${userInfo.token}",
      },
    };
    const {data} = await axios.put("http://alaic.pythonanywhere.com/api/orders/${id}/pay/",paymentResult, config); 
  dispatch({
    type: ORDER_PAY_SUCCESS, 
    payload: data,
  })

  } catch (error) {
  dispatch({ type: ORDER_PAY_FAIL,
  payload:
    error.response && error.response.data.detail 
    ? error.response.data.detail
    :error.message,
  });
}
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
  dispatch({
    type: ORDER_LIST_MY_REQUEST,
  });

  const {
  userLogin: { userInfo },
  } = getState();
  const config = {
  headers: {
  "Content-Type": "application/json", 
  Authorization: `Bearer ${userInfo.token}`,
  },
};
  const {data} = await axios.get(`http://alaic.pythonanywhere.com/api/orders/myorders`, config);
  dispatch({
  type: ORDER_LIST_MY_SUCCESS,
  payload: data,
  });

  } catch (error) {
  dispatch({ 
    type: ORDER_LIST_MY_FAIL,
    payload:
    error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message,
 });
  }
  };

  export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      /* MAKING API CALL TO GET THE DETAILS OF THE ORDERS MADE BY THE USER */
      const { data } = await axios.get(`http://alaic.pythonanywhere.com/api/orders/myorders/`, config);
  
      /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }

  }

  export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      /* MAKING API CALL TO GET THE DETAILS OF ALL THE ORDERS MADE BY THE ALL THE USERS */
      const { data } = await axios.get(`http://alaic.pythonanywhere.com/api/orders/`, config);
  
      /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  

  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      /* MAKING API CALL TO UPDATE ORDER DELIVERY STATUS */
      const { data } = await axios.put(
        `http://alaic.pythonanywhere.com/api/orders/${order._id}/deliver/`,
        {},
        config
      );
  
      /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  