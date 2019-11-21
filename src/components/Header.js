import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../index.css'

class Header extends Component{
    render(){
        return(
            <div>
            <div>
                <Link to='/'>Home</Link>
                {/* <Link to='/joke' className='header'>Joke</Link> */}
            </div>
            {this.props.children}
            </div>
        )
    }
}

export default Header;