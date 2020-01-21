import * as services from '../services/index';
// import { history } from "../components/helpers/history"

import {ALLPRODUCTS_SUCCESS, ALLPRODUCTS_FAILED, ADDPRODUCT_SUCCESS, ADDPRODUCT_FAILED} from '../constants/constants.js'


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

function success(productData) { return { type: ALLPRODUCTS_SUCCESS, productData } }
function fail(message) { return { type: ALLPRODUCTS_FAILED, message } }

function successAddProduct(productData) { return { type: ADDPRODUCT_SUCCESS, productData } }
function failAddProduct(message) { return { type: ADDPRODUCT_FAILED, message } }