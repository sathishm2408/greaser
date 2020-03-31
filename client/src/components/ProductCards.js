import React, { Component } from 'react';
import product_img from '../assets/product.jpg'
import './productCards.css';

export default class ProductCards extends Component {
    render() {
        console.log("pppp",this.props.product.image1)
        let baseUrl = 'http://localhost:3005/'
        return (
                <div className="col-lg-4 col-md-4 col-xs-6">
                    <div className="card product">
                        <img className='card-img-top productimg' src={baseUrl + `${this.props.product.images[0]}`} alt="products"></img>
                        <div className="card-body">
                            <h4 className='card-title'>{this.props.product.productName.toUpperCase()}</h4>
                            <b className='card-text'>Rs.{this.props.product.salesPrice}</b>
                            {
                                (this.props.viewed)?<p className='card-text'>Views {this.props.product.viewed}</p>:null
                            }
                            <p>
                                <a href={`/admin/product/${this.props.product._id}`} className="btn btn-success card-button">View</a>
                                <a href={`/admin/updateProduct/${this.props.product._id}`} className="btn btn-primary card-button">Update</a>
                                <a href={`/admin/product/${this.props.product._id}`} className="btn btn-danger card-button">Delete</a>
                            </p>
                        </div>
                    </div>
                    </div>
        )
    }
}
