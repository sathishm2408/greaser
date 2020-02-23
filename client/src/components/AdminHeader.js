import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import history from 'history';
import { Button, Header, Modal, Icon, Input } from 'semantic-ui-react';
import { login, logout, signup } from '../actions/users';
import '../index.css'

class AdminHeaderComponent extends Component {

    constructor(props) {
        super(props);
        //console.log("consssss",this.props);

        if (!sessionStorage.getItem('token'))
            this.props.history.push('/admin')

        this.state = {
            open: false,
            signup: false,
            validEmail: true
        }
    }

    componentDidMount() {
        console.log("!!!!!!!!!!!! in headerrrrrr component", this.props);
        // console.log("@@@@@@@@@@ didupdate component", this.props.user.message);   
    }

    componentDidUpdate() {
        console.log("!!!!!!!!!!!! didUpdate in headerrrrrr component", this.props);
    }

    show = (tab) => {
        this.setState({ open: true })
        if (tab === "signup") {
            this.setState({ signup: true })
        }
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
                <li className="nav-item"><button className="nav-link loginButton" onClick={() => this.show('login')}><i className="fa fa-sign-in"></i> Login</button></li>
                <li className="nav-item"><button className="nav-link loginButton" onClick={() => this.show('signup')}><i className="fa fa-user"></i> Signup</button></li>
                {/* <li className="nav-item"><a className="nav-link" href="/"><span className="fa fa-user"></span> Sign Up</a></li> */}
            </ul>
        )
    }

    validateEmail = (value) => {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log("*******",re.test(value));
        if (re.test(value))
            this.setState({ validEmail: true })
        else
            this.setState({ validEmail: false })
    }

    onLogin = async () => {
        const userId = document.getElementById("userId").value
        const password = document.getElementById("password").value
        //console.log("!!!!!!!!!!!!", this.props);
        this.props.login(userId, password);
    }

    onSignup = () => {
        console.log("helloooo")
        const signupId = document.getElementById("signupId").value
        const firstName = document.getElementById("firstName").value
        const lastName = document.getElementById("lastName").value
        const location = document.getElementById("location").value
        const mobile = document.getElementById("mobile").value
        const signupPassword = document.getElementById("signupPassword").value
        let bodyData = { signupId, firstName, lastName, location, mobile, signupPassword }
        console.log(bodyData);

        console.log("!!!!!!!!!!!!onSignup", this.props);
        this.props.signup(bodyData);
        return false;
    }

    loginError = () => {
        return (
            <div className="login-row">
                <p className='login-error'>{this.props.user.error}</p>
            </div>
        )
    }

    emailError = () => {
        return (
            <div>
                <p className='email-error'>Invalid emailID</p>
            </div>
        )
    }

    logout() {
        //console.log("ooooooooooo",this.props);
        this.props.logout();
    }

    modalType(value) {
        if (value === "signup") {
            this.setState({ signup: true })
            document.getElementById('signup-header').style.background = 'grey';
            document.getElementById('login-header').style.background = 'white';
        }
        else {
            this.setState({ signup: false })
            document.getElementById('signup-header').style.background = 'white';
            document.getElementById('login-header').style.background = 'grey';

        }
    }
    loginContent = () => {
        return (
            <Modal.Content>
                <div className="ui input login-row">
                    <label className="label-text">User Id</label>
                    <Input type="text" id="userId" name="email" autoFocus placeholder="Enter your email Id..." onChange={(e) => this.validateEmail(e.target.value)} />
                </div>
                {
                    (this.state.validEmail) ? null : this.emailError()
                }
                <div className="ui input login-row">
                    <label className="label-text">Password</label>
                    <Input type="password" id="password" name="password" placeholder="Enter your password"></Input>
                </div>
                {
                    (this.props.user.error) ? this.loginError() : null
                }

                <div className="login-row">
                    <button type="button" className="btn btn-outline-success login-submit" onClick={this.onLogin}>Submit</button>
                    <button type="button" className="btn btn-outline-danger login-cancel" onClick={() => this.close()}>Close</button>
                </div>
                <div className="login-row">
                    <p className='register'>New User? <u onClick={() => this.modalType("signup")}>click here to signup</u></p>
                </div>
            </Modal.Content>

        )
    }

    signupContent = () => {
        return (
            <Modal.Content>
                <div className="ui input signup-row">
                    <label className="label-text">User Id</label>
                    <Input type="email" id="signupId" autoFocus placeholder="Enter your email Id..." onChange={(e) => this.validateEmail(e.target.value)} required />
                </div>
                {
                    (this.state.validEmail) ? null : this.emailError()
                }
                <div className="ui input signup-row">
                    <label className="label-text">First Name</label>
                    <Input type="text" id="firstName" placeholder="Enter your First Name..." />
                </div>
                <div className="ui input signup-row">
                    <label className="label-text">Last Name</label>
                    <Input type="text" id="lastName" placeholder="Enter your Last Name..." />
                </div>
                <div className="ui input signup-row">
                    <label className="label-text">Location</label>
                    <Input type="text" id="location" placeholder="Enter your Location..." />
                </div>
                <div className="ui input signup-row">
                    <label className="label-text">Mobile</label>
                    <Input type="number" pattern="[7-9]{1}[0-9]{9}" id="mobile" placeholder="Enter your Mobile No..." required />
                </div>
                <div className="ui input signup-row">
                    <label className="label-text">Password</label>
                    <Input type="password" id="signupPassword" placeholder="Enter your password" required></Input>
                </div>
                {
                    (this.props.user.error) ? this.loginError() : null
                }

                <div className="login-row">
                    <button type="button" className="btn btn-outline-success login-submit" onClick={() => this.onSignup()}>Submit</button>
                    <button type="button" className="btn btn-outline-danger login-cancel" onClick={() => this.close()}>Close</button>
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
                        <button type="button" className="modalHeader" id="login-header" onClick={() => this.modalType("login")}>Login</button>
                        <button type="button" className="modalHeader" id="signup-header" onClick={() => this.modalType("signup")}>Signup</button>
                    </Modal.Header>
                    {
                        (signup) ? this.signupContent() : this.loginContent()
                    }
                </Modal>
            </div>
        )
        return (
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark edited">

                    <a className="navbar-brand" href="/admin">Product Inventory</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav justify-content-center ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/Addproduct">Add Product</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/views">Views</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Orders</a>
                            </li>
                            <li className="nav-item">
                                <div className="ui small icon input">
                                    <input type="text" placeholder="Search..." />
                                    <i className="search icon"></i>
                                </div>
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


export default connect(mapStateToProps, { login, logout, signup })(withRouter(AdminHeaderComponent))