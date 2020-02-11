import React, { Component } from 'react';
import ProductCards from './ProductCards';
import { connect } from 'react-redux';
import { getViews } from '../actions/product';
import './productCards.css';

class ProductViews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    UNSAFE_componentWillMount() {
        console.log("11111111",this.props);
        this.props.getViews();
    }
    render() {
        let data = [];
        let allProducts = this.props.ViewedProducts;
        //console.log("44444444",allProducts);
        if (allProducts) {
            data = allProducts.map((product) => {
                return <ProductCards key={product._id} product={product} viewed={product} />

            })
        }


        return (
            <div>
                <h2>Products</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-xs-0 filter"></div>
                        <div className="col-lg-10 col-md-10 col-xs-12">
                            <div className="row">
                                {data}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)

    return{ViewedProducts: state.products.productData}
}

export default connect(mapStateToProps, { getViews })(ProductViews)