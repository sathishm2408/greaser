import React, { Component } from 'react';
import ProductCards from './ProductCards';
import { connect } from 'react-redux';
import { getViews } from '../actions/product';
import Chart from './Chart';

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
        let labels =[]
        let data =[];
        let datasets=[];
        let productData = [];
        let chartData;
        let allProducts = this.props.ViewedProducts;
        //console.log("44444444",allProducts);
        if (allProducts) {
            productData = allProducts.map((product) => {
                labels.push(product.productName)
                data.push(Number(product.viewed));
                //return <ProductCards key={product._id} product={product} viewed={product} />
            })
            datasets.push({label:"views",data,backgroundColor:'rgba(75,192,192,0.4)',lineTension: 1,});
            console.log("ddddddd",{labels,datasets});
            chartData = {labels,datasets};
            
        }


        return (
            <div>
                <h2>Products</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-xs-0 filter"></div>
                        <div className="col-lg-10 col-md-10 col-xs-12">
                            <div className="row">
                                {/* {productData} */}
                            </div>
                        </div>
                    </div>
                    {
                        (productData)?<Chart data={chartData}/>:null
                    }
                    
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