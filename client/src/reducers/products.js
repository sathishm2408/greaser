import { ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED, ADDPRODUCT_SUCCESS, ADDPRODUCT_FAILED } from '../constants/constants'
const initialState = {

};

const getAllProductsReducer = (state = initialState, action) => {
    const { type, productData } = action;

    switch (type) {
        case ALLPRODUCTS_SUCCESS:
            console.log("ALLPRODUCTS_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData
            }
        case ALLPRODUCTS_FAILED:
            return action.message
        case ADDPRODUCT_SUCCESS:
            console.log("ADDPRODUCT_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData
            }
        case ADDPRODUCT_FAILED:
            console.log("ADDPRODUCT_FAILED in reducer", action.message)
            return action.message
        default:
            return state
    }
}
export default getAllProductsReducer;