import * as services from '../services/consumer';

import { CONSUMER_LOGIN_SUCCESS, CONSUMER_LOGIN_FAILED, CONSUMER_SIGNUP_SUCCESS, CONSUMER_SIGNUP_FAILED } from '../constants/consumer'


export function login(userId, password) {
   return dispatch => {

      services.loginCall(userId, password)
         .then(userData => {
            sessionStorage.setItem("userId", userData.user.emailId)
            sessionStorage.setItem("userName", userData.user.firstName)
            sessionStorage.setItem("token", userData.token)
            //console.log("sssssssss",sessionStorage.getItem('token'));
            window.location.reload();
            dispatch({ type: CONSUMER_LOGIN_SUCCESS, userData }, console.log("called in users action", userData))
         })
         .catch(error => {
            dispatch({ type: CONSUMER_LOGIN_FAILED, error })
            console.log(error.message)
         })

   }
}

export function logout() {
   return dispatch => {
      let token = sessionStorage.getItem('token');
      services.logout(token)
         .then(userData => {
            sessionStorage.clear();
            window.location.reload();
            
            // this.props.history.push("/")
         })
         .catch(error => {
            dispatch({ type: CONSUMER_LOGIN_FAILED, error })
            console.log(error.message)
         })

   }
}

export function signup(bodyData) {
   return dispatch => {

      services.signupService(bodyData)
         .then(userData => {
            sessionStorage.setItem("registered", "successful");
            //window.location.reload();
            dispatch({ type: CONSUMER_SIGNUP_SUCCESS, userData }, console.log("called in consumer signup action", userData))
         })
         .catch(error => {
            dispatch({ type: CONSUMER_SIGNUP_FAILED, error })
            console.log(error.message)
         })
   }
}

// function loginSuccess(userData) { return { type: LOGIN_SUCCESS, userData } }
// function loginFail(error) { return { type: LOGIN_FAILED, error } }
