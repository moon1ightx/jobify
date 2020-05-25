
import {USER_LOGIN, USER_SIGNUP, USER_LOGOUT, ERROR_HANDLE, GET_USER_INFO} from './types'
import axios from 'axios'


export const signUp = (user) => dispatch =>{
   axios.post('/api/signup', user)
    .then(res => {
        console.log("Response: ", res.data)
        dispatch({
            type: USER_SIGNUP,
        })

        setTimeout(() => {
            dispatch({
                type: USER_SIGNUP,
            })
        }, 1000)

    })
    .catch(err => {
        dispatch({
            type: ERROR_HANDLE,
            payload: err.response.data
        })
    })
};


export const logIn = (user) => dispatch =>{
    axios.post('/api/login', user)
     .then(res => {
         console.log("here!", res.data)
         localStorage.setItem('access_token', res.data.access)
         dispatch({
             type: USER_LOGIN,
             payload: res.data.access
         })
     })
     .catch((err) => {
        dispatch({
            type: ERROR_HANDLE,
            payload: err.response.data
        })
     })
 };

 export const logOut = () => dispatch =>{
    dispatch({
        type: USER_LOGOUT
    })
 };

 export const getUserInfo = () => dispatch =>{
    axios.get('/api/user_info', { headers: {
        "Content-Type": undefined
    }
})
     .then(res => {
         console.log("Response: ", res, res.data)
         dispatch({
             type: GET_USER_INFO,
             payload: res.data
         })
     })
     .catch(err => console.log(err))
 };
 
