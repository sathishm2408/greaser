import React, { Component } from 'react';
import shoppingImage from './shoppingImage.png';
import './Header.css'
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import { Link } from 'react-router-dom';
// import Searchbar from '../Searchbar/Searchbar';
import SigninBox from '../SignInBox/SignInBox'
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux'
// import { addProductToCart2 } from '../../actions/products'

class Header extends Component {
  

  onSignout = () => {
    this.props.onSignout()
  }

  render(){
    let count = 0;
    // this.props.cart.map(el=> {
    //     count = count + el.qty
    // })

    return (
      <Navbar>
        <div>
          <HamburgerIcon  name={this.props.name} onSignout={this.onSignout}/>
        </div>
        
        <div className="shoppingImage">
          <Link to="/"><img src={shoppingImage} alt="marketplace" /></Link>
        </div>
        {/* <Searchbar /> */}
        <SigninBox name={this.props.name} onSignout={this.onSignout}/>
        
        <div className="cartIcon">
          <Link to="/nav_cart"><i className="fas fa-cart-plus" style={{color:"white"}}></i></Link>
          {count>0 && <div className="cartCounter">{count}</div>}
        </div>
      
        </Navbar>
  )
  }

}

const mapStateToProps = state => {
  return {
    cart : state.cart
  }
}


export default connect(mapStateToProps)(Header);