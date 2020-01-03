import { ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED } from '../constants/constants'
const initialState = {

};

const getAllProductsReducer = (state = initialState , action) => {
    const {type, productData} = action;
    
    switch (type) {
        case ALLPRODUCTS_SUCCESS:
            console.log("ALLPRODUCTS_SUCCESS in reducer",type,productData)
            return {
                ...state,
                productData
            }
        case ALLPRODUCTS_FAILED:
            return action.message
        default:
            return state
    }
}
export default getAllProductsReducer;