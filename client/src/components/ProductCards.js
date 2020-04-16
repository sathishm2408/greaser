import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteProduct} from '../actions/product'
import './productCards.css';

class ProductCards extends Component {
    deleteProducts=(id)=>{
        var delConfirm= window.confirm("Are you sure you want to delete this product");
        if(delConfirm == true)
            this.props.deleteProduct(id)
    }
    render() {
        if(this.props.deletedProduct){
            window.location.reload();
            this.props.deletedProduct = null;
        }
        console.log("pppp",this.props.product.images[0])
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
                                <button type="button" onClick={()=>this.deleteProducts(this.props.product._id)} className="btn btn-danger card-button">Delete</button>
                            </p>
                        </div>
                    </div>
                    </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return { deletedProduct: state.products.deletedData }
}
//withRouter has been removed, if u face any problrm paste withRouter
export default connect(mapStateToProps, { deleteProduct })((ProductCards))
