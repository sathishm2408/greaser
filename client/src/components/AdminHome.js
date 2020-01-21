import React, { Component } from 'react';
import ProductCards from './ProductCards';
import { connect } from 'react-redux';
import { getAllProducts } from '../actions/product';
import './productCards.css';

class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    UNSAFE_componentWillMount() {
        //console.log("11111111",this.props);
        this.props.getAllProducts();
    }
    render() {
        let data = [];
        let allProducts = this.props.allProducts;
        //console.log("44444444",allProducts);
        if (allProducts) {
            data = allProducts.map((product) => {
                return <ProductCards key={product._id} product={product} />

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

const mapStateToProps = (state) => ({

    allProducts: state.products.productData
})

export default connect(mapStateToProps, { getAllProducts })(AdminHome)