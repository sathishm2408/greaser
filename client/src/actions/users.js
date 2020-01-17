import * as services from '../services/index';

import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../constants/constants.js'


export function login(userId, password) {
   return dispatch => {

      services.loginCall(userId, password)
         .then(userData => {
            sessionStorage.setItem("userId", userData.user.emailId)
            sessionStorage.setItem("userName", userData.user.firstName)
            sessionStorage.setItem("token", userData.token)
            //console.log("sssssssss",sessionStorage.getItem('token'));
            window.location.reload();
            dispatch(loginSuccess(userData), console.log("called in users action", userData))
         }
         )
         .catch(e => {
            dispatch(loginFail(e.message))
            console.log(e.message)
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
         }
         )
         .catch(e => {
            dispatch(loginFail(e.message))
            console.log(e.message)
         })

   }
}

export function signup(bodyData) {
   return dispatch => {

      services.signupService(bodyData)
         .then(userData => {
            sessionStorage.setItem("registered", "successful");
            window.location.reload();
            dispatch(signupSuccess(userData), console.log("called in users action", userData))
         }
         )
         .catch(e => {
            dispatch(signupFail(e.message))
            console.log(e.message)
         })

   }
}

function loginSuccess(userData) { return { type: LOGIN_SUCCESS, userData } }
function loginFail(error) { return { type: LOGIN_FAILED, error } }

function signupSuccess(userData) { return { type: SIGNUP_SUCCESS, userData } }
function signupFail(error) { return { type: SIGNUP_FAILED, error } }