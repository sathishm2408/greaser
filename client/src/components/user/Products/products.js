import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getProducts } from '../../actions/products';
import * as actionCreaters from '../../actions/products';
import Promotions from './Promotions';
import ProductCards from './ProductCards';
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../../constants/products';

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.props.getProducts((this.props.location.pathname).slice(10))
        this.state = {
            products: []
        }
    }

    render() {
        // console.log("propsss", this.props);
        let allProducts = this.props.allProducts;
        let data = [], filteredProduct = [];

        if (allProducts) {
            data = allProducts.map((product) => {
                let inCart = false;
                if (this.props.cartData.length !== 0) {
                    filteredProduct = this.props.cartData.filter((cartProduct) => {
                        return cartProduct.productDetails.id === product.id
                    })
                }

                if (filteredProduct.length !== 0) {
                    inCart = true;
                }
                return <ProductCards key={product.id} product={product} addToCart={(product) => this.props.addProductToCart(product, this.props.auth)}
                    inCart={inCart} removeFromCart={() => this.props.removeProductFromCart(product, this.props.auth)} />
            })
        }
        return (
            <div className='container-fluid'>
                <Promotions category={(this.props.location.pathname).slice(10)} />
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-0 filter"></div>
                    <div className="col-lg-10 col-md-10 col-xs-12">
                        <div className="row">
                            {data}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("sttt", state);
    return {
        allProducts: state.productData,
        auth: state.auth,
        cartData: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (data) => dispatch(getProducts(data)),
        addProductToCart: (product, auth) => dispatch(actionCreaters.addToCart(product, auth)),
        removeProductFromCart: (product, auth) => dispatch(actionCreaters.removeFromCart({ ...product, qty: 1 }, auth)),
        addProductToCart2: (product) => dispatch({ type: ADD_PRODUCT_TO_CART, data: product }),
        removeProductFromCart2: (product) => dispatch({ type: REMOVE_PRODUCT_FROM_CART, productData: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products))

