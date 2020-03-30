import * as services from '../services/index';
// import { history } from "../components/helpers/history"
import {
      ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED, ADDPRODUCT_SUCCESS, ADDPRODUCT_FAILED,
      GETVIEWS_SUCCESS, GETVIEWS_FAILED, GETPRODUCTDETAILS_SUCCESS, GETPRODUCTDETAILS_FAILED,
      UPDATEPRODUCT_SUCCESS, UPDATEPRODUCT_FAILED, DELETEPRODUCT_SUCCESS, DELETEPRODUCT_FAILED, FILTEREDPRODUCT_SUCCESS
} from '../constants/constants.js'


export function getAllProducts() {
      return dispatch => {

            services.getAllProducts()
                  .then(productData => {
                        dispatch(success(productData), console.log("called in action", productData))
                  }
                  )
                  .catch(e => {
                        dispatch(fail(e.message))
                        console.log(e.message)
                  })

      }

}

export function addProduct(reqBody) {
      return dispatch => {

            services.addProduct(reqBody)
                  .then(addedProductData => {
                        dispatch(successAddProduct(addedProductData), console.log("called in action", addedProductData))
                  }
                  )
                  .catch(e => {
                        dispatch(failAddProduct(e.message))
                        console.log(e.message)
                  })

      }

}

export function getViews() {
      return dispatch => {

            services.getViews()
                  .then(productData => {
                        dispatch(successViews(productData), console.log("called in action", productData))
                  }
                  )
                  .catch(e => {
                        dispatch(failViews(e.message))
                        console.log(e.message)
                  })
      }
}

export function getProductDetails(id) {
      return dispatch => {

            services.getProductDetails(id)
                  .then(productData => {
                        dispatch(successProductDetails(productData), console.log("called in action", productData))
                  }
                  )
                  .catch(e => {
                        dispatch(failProductDetails(e.message))
                        console.log(e.message)
                  })
      }
}

export function getFilteredProduct(products) {
      console.log(products, "iiiii")
      return dispatch => {
            dispatch(
                  { type: FILTEREDPRODUCT_SUCCESS, productData: products }
            )
      }
}

export function updateProduct(id, reqBody) {
      return dispatch => {

            services.updateProduct(id, reqBody)
                  .then(productData => {
                        dispatch(successUpdateProduct(productData), console.log("called in action", productData))
                  }
                  )
                  .catch(e => {
                        dispatch(failUpdateProduct(e.message))
                        console.log(e.message)
                  })
      }
}

export function deleteProduct(id) {
      return dispatch => {

            services.deleteProduct(id)
                  .then(productData => {
                        dispatch(successDeleteProduct(productData), console.log("called in action", productData))
                  }
                  )
                  .catch(e => {
                        dispatch(failDeleteProduct(e.message))
                        console.log(e.message)
                  })
      }
}

function success(productData) { return { type: ALLPRODUCTS_SUCCESS, productData } }
function fail(message) { return { type: ALLPRODUCTS_FAILED, message } }

function successAddProduct(productData) { return { type: ADDPRODUCT_SUCCESS, addedProductData:productData } }
function failAddProduct(message) { return { type: ADDPRODUCT_FAILED, message } }

function successViews(productData) { return { type: GETVIEWS_SUCCESS, productData } }
function failViews(message) { return { type: GETVIEWS_FAILED, message } }

function successProductDetails(productData) { return { type: GETPRODUCTDETAILS_SUCCESS, productData } }
function failProductDetails(message) { return { type: GETPRODUCTDETAILS_FAILED, message } }

function successUpdateProduct(productData) { return { type: UPDATEPRODUCT_SUCCESS, updatedData: productData } }
function failUpdateProduct(message) { return { type: UPDATEPRODUCT_FAILED, message } }

function successDeleteProduct(productData) { return { type: DELETEPRODUCT_SUCCESS, productData } }
function failDeleteProduct(message) { return { type: DELETEPRODUCT_FAILED, message } }
