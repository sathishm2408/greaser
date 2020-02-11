import * as services from '../services/index';
// import { history } from "../components/helpers/history"

import {ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED, ADDPRODUCT_SUCCESS, ADDPRODUCT_FAILED,
   GETVIEWS_SUCCESS, GETVIEWS_FAILED, GETPRODUCTDETAILS_SUCCESS, GETPRODUCTDETAILS_FAILED} from '../constants/constants.js'


export function getAllProducts() {
   return dispatch => {

      services.getAllProducts()
         .then(productData => {
            dispatch(success(productData), console.log("called in action",productData))
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
         .then(productData => {
            dispatch(successAddProduct(productData), console.log("called in action",productData))
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
            dispatch(successViews(productData), console.log("called in action",productData))
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
            dispatch(successProductDetails(productData), console.log("called in action",productData))
         }
)
         .catch(e => {
            dispatch(failProductDetails(e.message))
            console.log(e.message)
         })
   }
}
function success(productData) { return { type: ALLPRODUCTS_SUCCESS, productData } }
function fail(message) { return { type: ALLPRODUCTS_FAILED, message } }

function successAddProduct(productData) { return { type: ADDPRODUCT_SUCCESS, productData } }
function failAddProduct(message) { return { type: ADDPRODUCT_FAILED, message } }

function successViews(productData) { return { type: GETVIEWS_SUCCESS, productData } }
function failViews(message) { return { type: GETVIEWS_FAILED, message } }

function successProductDetails(productData) { return { type: GETPRODUCTDETAILS_SUCCESS, productData } }
function failProductDetails(message) { return { type: GETPRODUCTDETAILS_FAILED, message } }