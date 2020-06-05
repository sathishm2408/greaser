import React, { Component } from 'react';
import ProductCards from './ProductCards';
import { connect } from 'react-redux';
import { getAllProducts, getFilteredProduct } from '../../actions/product';
import './productCards.css';

export class AdminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }


    render() {
        //console.log(this.props.filteredProduct, "in product page Its coming!!!!!")
        let data = [];
        let allProducts = this.props.filteredProduct && this.props.filteredProduct != null ? this.props.filteredProduct : this.props.allProducts;
        //console.log("44444444",allProducts);
        // if (this.props.product) {
        //     data = this.props.product.map((product) => {
        //         return <ProductCards key={product._id} product={product} />

        //     })

        // }
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

    allProducts: state.products.productData,
    filteredProduct: state.products.filteredData
})

export default connect(mapStateToProps, { getFilteredProduct })(AdminHome)