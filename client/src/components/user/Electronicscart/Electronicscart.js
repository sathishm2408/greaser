import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Electronicscart.css';
import { connect } from 'react-redux';
import * as actionCreaters from '../../actions/products';
import {UPDATE_QUANTITY, REMOVE_PRODUCT_FROM_CART} from '../../constants/products'

class Electronicscart extends Component {
    state = {
        electronics: [],
        quantity:''
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/products?category=electronics`).then((response) => {
           
            this.setState({ electronics: response.data });
        })
    }

     handleChange = (e,product) =>{
         console.log("quantity",e.target.value)
        this.props.updateQuantity(product,e.target.value) 
     }
    
    render() {
        console.log("abc",this.state.quantity)

        //  const optionarr =[
        //     {key:1,text:"1", value:1},
        //     {key:2,text:"1" ,value:2},
        //     {key:3,text:"1", value:3},
        //     {key:4,text:"1", value:4},
        // ]
        // console.log(this.state.quantity)
        console.log("111",this.props);
        if (this.state.electronics.length === 0) {
            console.log(this.state.electronics.length)
            return ("")
        }
        else {
            return (
                <div className="eMainDiv">
                    <div className="cartdiv">
                    <div className="priceNameDiv">
                            <p>price</p>
                        </div>
                        <div>
                            <h2><strong>Shopping cart</strong></h2>
                        </div>
                    <div className="mCartSummary">
                        <h5>Cart Summary</h5>
                        <div className="proceedToBuyDiv">
                            <button className="proceedToBuyButton">Proceed To Pay</button>
                        </div>
                     </div>
                        
                        
                        {this.props.product.map((item) =>
                            <div className="mapDiv">
                                <hr />
                                <div className="price">
                        <p><b><i class="fas fa-rupee-sign"></i>{item.productDetails.price}</b></p>
                                </div>
                                <div className="pimage">
                                    <img src={item.productDetails.thumbnailUrl} alt="Electronics" className="cart_items" />
                                </div>
                                <div className="contentDiv">
                                    <ul>
                                        <li> <a href="#" className="title">{item.productDetails.title}</a></li>
                                        <li className="mPrice">
                                          <b><i class="fas fa-rupee-sign"></i>{item.productDetails.price}</b>
                                         </li>
                                    </ul>
                                    <div className="secondContentDiv">
                                    <select name="quantity"id="cars" onChange={(event) =>this.handleChange(event,item.productDetails)}  >
                                       
                                        <option value="1">Qty:1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        
                                    </select>&nbsp;&nbsp;
                                    <span>|</span>
                                    <span className="delete_cart" onClick={() => this.props.removeProductFromCart(item.productDetails, this.props.auth)}> Delete</span>&nbsp;&nbsp;<span>|</span>
                                      <a href="#"> Save for later</a>&nbsp;&nbsp;
                                    </div>
                                    
                                </div>
                              
                            </div>)
                           
                        }
                    </div>
                    <div className="cartSummary">
                        <h5>Cart Summary</h5>
                        <div className="proceedToBuyDiv">
                            <button className="proceedToBuyButton">Proceed To Pay</button>
                        </div>
                    </div>
                
                   
                </div>


            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log("sttt",state);   
   return{product:state.cart}
}



const mapDispatchToProps = dispatch => {
    return {
        updateQuantity : (product,value)=>dispatch({type: UPDATE_QUANTITY, productData:product,quantity:value}),
        removeProductFromCart: (product, auth) => dispatch(actionCreaters.removeFromCart({ ...product, qty: 1 }, auth)),
        removeProductFromCart2: (product) => dispatch({ type: REMOVE_PRODUCT_FROM_CART, productData: product })
    }
}


// export default Electronicscart;
export default connect(mapStateToProps, mapDispatchToProps)((Electronicscart))
