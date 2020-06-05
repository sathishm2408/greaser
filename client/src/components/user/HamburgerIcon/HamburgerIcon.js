import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './HamburgerIcon.css'

class HamburgerIcon extends Component{
    constructor(props){
        super(props)
        this.state={
          showMenu: false
          
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        
    }

    showMenu(event) {
      event.preventDefault();
      
      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
      
    }
    
    closeMenu() {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }

    
    
    
    

    

    render(){
        return(
            <div className="container1">
            <div className="hamburgerIcon" onClick={this.showMenu}>
              <i className="fas fa-bars fa-2x" ></i> 
            </div>
            {
          this.state.showMenu
            ? (
            <div className={`itemsContainer  ${this.state.showMenu?'show':'hide'}`}  >
                <ul className="menuItem">
                    <li className="menuList">
                      {!this.props.name && <Link to="/signin" className="menuLink">
                        <button className="signInBtn">Sign in</button>
                      </Link>}
                      {this.props.name && <div className="menuLink"><button className="signInBtn" onClick={this.onSignOutClickHandler}>Sign out</button></div>}
                    </li>
                    <li className="menuList"><Link to="/home"><a href="#action1" className="menuLink">Home</a></Link></li>
                    <li className="menuList"><a href="#action2" className="menuLink">About us</a></li>
                    <li className="menuList"><a href="#action3" className="menuLink">Contact us</a></li>

                </ul>
            </div>
            ):
            (
              null
            )
        }
            </div>        
    )
    }
    
}
export default HamburgerIcon