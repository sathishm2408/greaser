import React, { Component } from 'react';
import product_img from '../assets/product.jpg'
import './productCards.css';

export default class ProductCards extends Component {
    render() {
        return (
                <div className="col-lg-4 col-md-4 col-xs-6">
                    <div className="card product">
                        <img className='card-img-top productimg' src={product_img} alt="products"></img>
                        <div className="card-body">
                            <h4 className='card-title'>{this.props.product.productName.toUpperCase()}</h4>
                            <b className='card-text'>Rs.{this.props.product.price}</b>
                            {
                                (this.props.viewed)?<p className='card-text'>Views {this.props.product.viewed}</p>:null
                            }
                            <p>
                                <a href={`/admin/product/${this.props.product._id}`} className="btn btn-primary">View Product</a>
                            </p>

                        </div>
                    </div>
                    </div>
        )
    }
}
