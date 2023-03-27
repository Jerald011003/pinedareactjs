import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducers,productDetailsReducers} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userLoginReducers } from './reducers/userReducers';
import { userRegisterReducers } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer } from './reducers/orderReducers';
import { userProfileUpdateReducer } from './reducers/userReducers';
import { orderPayReducer } from './reducers/orderPayReducer';
import { orderListMyReducer } from './reducers/orderListMyReducer';


const reducer =combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    userUpdateProfile: userProfileUpdateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')): null

// const middleware=[thunk]
// const store = createStore(reducer,initailState,composeWithDevTools(applyMiddleware(...middleware)))

const shippingAddressFromStorage = localStorage.getItem("shippinhAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
:{};

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage},
}

const middleware=[thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );


export default store;