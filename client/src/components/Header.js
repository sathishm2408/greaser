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

    render() {

        const { open } = this.state;
        //console.log(this.state.open, "modal ")

        let modal = (
            <div>
                <Modal className="loginModal" size="tiny" open={open} onClose={() => this.close()}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content>
                        <div className="login-row">
                            <label className="label-text">User Id</label>
                            <input type="text" id="userId" placeholder="Enter your email Id" autoFocus></input>
                        </div>
                        <div className="login-row">
                            <label className="label-text">Password</label>
                            <input type="password" id="password" placeholder="Enter your password"></input>
                        </div>
                        {
                            (this.props.user.error) ? this.loginError() : null
                        }

                        <div className="login-row">
                            <button positive type="button" className="btn btn-outline-success login-submit" onClick={this.onLogin}>Submit</button>
                            <button negative type="button" className="btn btn-outline-danger login-cancel" onClick={() => this.close()}>Close</button>
                        </div>
                        <div className="login-row">
                            <p className='register'>New User? <a href='/'>click here to signup</a></p>
                        </div>
                    </Modal.Content>
                </Modal>
                {

                }
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