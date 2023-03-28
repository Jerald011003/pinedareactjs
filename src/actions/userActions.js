import { USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LOGIN_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST, 
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_FAIL,
 } from '../constants/userConstants'
import axios from 'axios'

export const login = (email,password)=> async(dispatch)=>{

   try{
       dispatch({
           type:USER_LOGIN_REQUEST
       })

       const config ={
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data}= await axios.post('http://alaic.pythonanywhere.com/api/users/login/',
       
       {'username':email,'password':password},config
       
       
       )

       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })

       localStorage.setItem('userInfo',JSON.stringify(data))



   }

   catch(error){
    dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
   }

}


export const register =(name,email,password)=> async(dispatch)=>{
    try{

       dispatch({
           type:USER_REGISTER_REQUEST
       })

       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data}= await axios.post('http://alaic.pythonanywhere.com/api/users/register/',
       
       
       {'name':name,'email':email,'password':password },config )

       dispatch({
           type:USER_REGISTER_SUCCESS,
           payload:data
       })
       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })

       localStorage.setItem('userInfo',JSON.stringify(data))

    }
    catch(error){

       dispatch({
           type:USER_REGISTER_FAIL,
           payload:error.response && error.response.data.detail
           ? error.response.data.detail
           :error.message,
       })

    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: {userInfo} 
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
        `http://alaic.pythonanywhere.com/api/user`,
        config
    );
    dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
    })

    }catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
        })
    }
}

export const userUpdateProfile = (user) => async (dispatch, getState) => {
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: {userInfo} 
        } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
        `http://alaic.pythonanywhere.com/api/users/profile/update`,
        user,
        config
        )
    dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
    })

    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
    })

    }catch(error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
        })
    }
}



export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({type: USER_DETAILS_RESET})
    // dispatch({type: ORDER_LIST_MY_RESET})
 
}

// export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: USER_DETAILS_REQUEST,
//       });
//       const {
//         userLogin: { userInfo },
//       } = getState();
//       console.log(userInfo); // check value of userInfo
//       const config = {
//         headers: {
//           Authorization: Bearer ${userInfo.token},
//         },
//       };
//       const { data } = await axios.get(/api/user, config);
//       const { name } = data; // extract user's name from API response
//       dispatch({
//         type: USER_DETAILS_SUCCESS,
//         payload: { ...data, username: name }, // update payload to include user's name
//       });
//     } catch (error) {
//       dispatch({
//         type: USER_DETAILS_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
  
    
//   export const updateUserProfile = (user) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  
//       const { userLogin: { userInfo } } = getState();
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: Bearer ${userInfo.token},
//         },
//       };
  
//       const { data } = await axios.put(/api/update/, user, config);
  
//       dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
//       localStorage.setItem('userInfo', JSON.stringify(data));
//     } catch (error) {
//       dispatch({
//         type: USER_UPDATE_PROFILE_FAIL,
//         payload: error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//       });
//     }
//   };