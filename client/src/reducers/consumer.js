import { CONSUMER_LOGIN_SUCCESS, CONSUMER_LOGIN_FAILED, CONSUMER_SIGNUP_SUCCESS, CONSUMER_SIGNUP_FAILED } from '../constants/consumer';
const initialState = {
    
};

const loginReducer = (state = initialState , action) => {
    const {type, userData, error} = action;
    
    switch (type) {
        case CONSUMER_LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS in reducer",{...state,...userData})
            console.log("LOGIN_SUCCESS and modal in reducer",state)
            return {
                ...state,
                authenticated:true,
                ...userData
            }
        case CONSUMER_LOGIN_FAILED:
            console.log("LOGIN_FAILED in reducer",{...state,error})
            return {...state, authenticated:false, error}
        case CONSUMER_SIGNUP_SUCCESS:
            console.log("CONSUMER_SIGNUP_SUCCESS in reducer",{...state,...userData})
            console.log("CONSUMER_SIGNUP_SUCCESS and modal in reducer",state)
            return {
                ...state,
                registered:true
            }
        case CONSUMER_SIGNUP_FAILED:
            console.log("CONSUMER_SIGNUP_FAILED in reducer",{...state,error})
            return {...state, registered:false, error}
        default:
            return state
    }
}
export default loginReducer;