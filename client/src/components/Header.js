import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header, Modal, Icon, Input } from 'semantic-ui-react';
import { login, logout } from '../actions/users';
import '../index.css'

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            signup: false
        }
    }

    componentDidMount() {
        console.log("!!!!!!!!!!!! in headerrrrrr component", this.props);
        // console.log("@@@@@@@@@@ didupdate component", this.props.user.message);   
    }

    show = () => {
        this.setState({ open: true })

    }
    close = () => {
        //console.log("open is false")
        this.setState({ open: false })
    }


    loggedInIcons = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item"><button className="nav-link loginButton" onClick={() => this.logout()}><i className="fa fa-sign-out"></i> Logout</button></li>
                <li className="nav-item"><a className="nav-link" href="/"><span className="fa fa-user"></span> {sessionStorage.getItem('userName')}</a></li>
            </ul>
        )
    }

    loginIcons = () => {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item"><button className="nav-link loginButton" onClick={() => this.show('mini')}><i className="fa fa-sign-in"></i> Login</button></li>
                <li className="nav-item"><a className="nav-link" href="/"><span className="fa fa-user"></span> Sign Up</a></li>
            </ul>
        )
    }

    onLogin = async () => {
        const userId = document.getElementById("userId").value
        const password = document.getElementById("password").value
        //console.log("!!!!!!!!!!!!", this.props);
        this.props.login(userId, password);
    }

    loginError = () => {
        return (
            <div className="login-row">
                <p className='login-error'>{this.props.user.error}</p>
            </div>
        )
    }

    logout() {
        //console.log("ooooooooooo",this.props);
        this.props.logout();
    }

    modalType(value){
        if(value === "signup")
            this.setState({ signup: true })
        else
        this.setState({ signup: false })
    }
    loginContent=()=>{
        return(
            <Modal.Content>
                        <div className="ui input login-row">
                            <label className="label-text">User Id</label>
                            <Input type="text" id="userId" autofocus placeholder="Enter your email Id..." /> 
                        </div>
                        <div className="ui input login-row">
                            <label className="label-text">Password</label>
                            <Input type="password" id="password" placeholder="Enter your password"></Input>
                        </div>
                        {
                            (this.props.user.error) ? this.loginError() : null
                        }

                        <div className="login-row">
                            <button positive type="button" className="btn btn-outline-success login-submit" onClick={this.onLogin}>Submit</button>
                            <button negative type="button" className="btn btn-outline-danger login-cancel" onClick={() => this.close()}>Close</button>
                        </div>
                        <div className="login-row">
                            <p className='register'>New User? <u onClick={() => this.modalType("signup")}>click here to signup</u></p>
                        </div>
                    </Modal.Content>
        )
    }

    signupContent=()=>{
        return(
            <Modal.Content>
                        <div className="ui input signup-row">
                            <label className="label-text">User Id</label>
                            <Input type="text" id="userId" autofocus placeholder="Enter your email Id..." /> 
                        </div>
                        <div className="ui input signup-row">
                            <label className="label-text">First Name</label>
                            <Input type="text" id="firstName" autofocus placeholder="Enter your First Name..." /> 
                        </div>
                        <div className="ui input signup-row">
                            <label className="label-text">Last Name</label>
                            <Input type="text" id="lastName" autofocus placeholder="Enter your Last Name..." /> 
                        </div>
                        <div className="ui input signup-row">
                            <label className="label-text">Location</label>
                            <Input type="text" id="location" autofocus placeholder="Enter your Location..." /> 
                        </div>
                        <div className="ui input signup-row">
                            <label className="label-text">Mobile</label>
                            <Input type="text" id="mobile" autofocus placeholder="Enter your Mobile No..." /> 
                        </div>
                        <div className="ui input signup-row">
                            <label className="label-text">Password</label>
                            <Input type="password" id="password" placeholder="Enter your password"></Input>
                        </div>
                        {/* {
                            (this.props.user.error) ? this.loginError() : null
                        } */}

                        <div className="login-row">
                            <button positive type="button" className="btn btn-outline-success login-submit" onClick={this.onLogin}>Submit</button>
                            <button negative type="button" className="btn btn-outline-danger login-cancel" onClick={() => this.close()}>Close</button>
                        </div>
                        <div className="login-row">
                            <p className='register'>New User? <u onClick={() => this.modalType("signup")}>click here to signup</u></p>
                        </div>
                    </Modal.Content>
        )
    }

    render() {

        const { open, signup } = this.state;

        let modal = (
            <div>
                <Modal className="loginModal" size="tiny" open={open} onClose={() => this.close()}>
                    <Modal.Header>
                       <button type="button" className="modalHeader" onClick={() => this.modalType("login")}>Login</button> 
                       <button type="button" className="modalHeader" onClick={() => this.modalType("signup")}>Signup</button> 
                    </Modal.Header>
                    {
                        (signup)?this.signupContent():this.loginContent()
                    }
                </Modal>
            </div>
        )
        return (
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">

                    <a className="navbar-brand" href="/">Product Inventory</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav justify-content-center ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Add Product</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Link</a>
                            </li>
                        </ul>
                        {
                            sessionStorage.getItem('userName') ? this.loggedInIcons() : this.loginIcons()
                        }
                    </div>
                </nav>
                {modal}
                {this.props.children}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    // user : state.users
    console.log("mapStateToProps", state);
    return { user: state.users }

}


export default connect(mapStateToProps, { login, logout })(HeaderComponent)