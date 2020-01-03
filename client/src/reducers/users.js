import { LOGIN_SUCCESS, LOGIN_FAILED } from '../constants/constants'
const initialState = {
    
};

const loginReducer = (state = initialState , action) => {
    const {type, userData, error} = action;
    
    switch (type) {
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS in reducer",{...state,...userData})
            console.log("LOGIN_SUCCESS and modal in reducer",state)
            return {
                ...state,
                authenticated:true,
                ...userData
            }
        case LOGIN_FAILED:
            console.log("LOGIN_FAILED in reducer",{...state,error})
            return {...state, authenticated:false, error}
        default:
            return state
    }
}
export default loginReducer;