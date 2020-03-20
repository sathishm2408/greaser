import {
    ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED, ADDPRODUCT_SUCCESS, ADDPRODUCT_FAILED,
    GETVIEWS_SUCCESS, GETVIEWS_FAILED, GETPRODUCTDETAILS_SUCCESS, GETPRODUCTDETAILS_FAILED,
    UPDATEPRODUCT_SUCCESS, UPDATEPRODUCT_FAILED, DELETEPRODUCT_SUCCESS, DELETEPRODUCT_FAILED, FILTEREDPRODUCT_SUCCESS
} from '../constants/constants'
const initialState = {

};

const getAllProductsReducer = (state = initialState, action) => {
    const { type, productData, updatedData, message } = action;

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
        case GETVIEWS_SUCCESS:
            console.log("GETVIEWS_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData
            }
        case GETVIEWS_FAILED:
            console.log("GETVIEWS_FAILED in reducer", action.message)
            return action.message
        case GETPRODUCTDETAILS_SUCCESS:
            console.log("GETPRODUCTDETAILS_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData
            }
        case GETPRODUCTDETAILS_FAILED:
            console.log("GETPRODUCTDETAILS_FAILED in reducer", action.message)
            return { message }
        case UPDATEPRODUCT_SUCCESS:
            console.log("UPDATEPRODUCT_SUCCESS in reducer", type, action.updatedData)
            return {
                ...state,
                updatedData
            }
        case UPDATEPRODUCT_FAILED:
            console.log("UPDATEPRODUCT_FAILED in reducer", action.message)
            return { message }
        case DELETEPRODUCT_SUCCESS:
            console.log("DELETEPRODUCT_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData
            }
        case DELETEPRODUCT_FAILED:
            console.log("DELETEPRODUCT_FAILED in reducer", action.message)
            return action.message
        case FILTEREDPRODUCT_SUCCESS:
            return {
                ...state,
                productData
            }
        default:
            return state
    }
}
export default getAllProductsReducer;