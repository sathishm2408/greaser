import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Form, InputGroup, Col, Button} from 'react-bootstrap'
import './Signin.css';
// import Logo from '../../asset/shoppingImage.png';
// import service from '../../Utility/Services';
import Alert from '../Alert/Alert';

class Signin extends Component {

    state = {
        validated:{
            username: true,
            password: true
        },
        validation: true,
        formData : {
            username: "",
            password: ""
        },
        showErr : false
    }

    onChangeHandler = (event) => {
        if(event.target.value == "") {
            this.setState({
                validated:{
                    ...this.state.validated,
                    [event.target.name]: false
                },
                formData:{
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                },
                showErr: false
            })
        }else {
            this.setState({
                validated:{
                    ...this.state.validated,
                    [event.target.name]: true
                },
                formData:{
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                },
                showErr: false
            })
        }
        
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation(); 
        let validation = true;
        let usernameValid = true;
        let passValid = true;
        if(this.state.formData.username === "" || this.state.formData.username == undefined ) {
            validation = false;
            usernameValid = false;
        }
        if(this.state.formData.password === "" || this.state.formData.password == undefined) {
            validation = false;
            passValid = false;
        }
        console.log(this.state);
        if(!validation){
            this.setState({
                validated : {
                    password: passValid,
                    username : usernameValid
                },
                validation:false
            })
            return
        }

        // service.signIn(this.state.formData)
        // .then(res => {
        //     if(res.status === 200){
        //         this.props.onAuth(res.data);
        //         this.props.history.push('/')
        //     }else {
        //         this.alertOpenHandler();
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     this.alertOpenHandler();
        // })
    };

    alertOpenHandler = () => {
        this.setState({
            showErr: true
        })
    }

    alertCloseHandler = () => {
        this.setState({
            showErr: false
        })
    }


    render(){

        return (
            <div>
                {/* <Alert show={this.state.showErr} variant={"danger"} msg={"Login Falied"} onClose={this.alertCloseHandler}/> */}
                <div className="logoImg">
                {/* <img src={Logo} /> */}
                </div>
                {/* onSubmit={this.handleSubmit}  */}
                {this.state.showErr && 
                <div className = "errDiv">
                    <div className="errIcon"></div>
                    <div className="errMsg">
                        <h4>There was a problem</h4>
                        <span>Username or Paswword is incorrect.</span>
                    </div>
                </div>}
                <Form className = "myformDiv">
                    <div className="loginTitle">Login</div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustomUsername">
                        <Form.Label>Username<sup>*</sup></Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            onChange={this.onChangeHandler}
                            value={this.state.formData.username}
                            style={{border:this.state.validated.username?"":"1px solid red"}}
                        />
                        <Form.Control.Feedback type="invalid">
                            *Please enter your username.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom04">
                        <Form.Label>Password <sup>*</sup></Form.Label>
                        <Form.Control 
                            type="password"
                            name="password" 
                            placeholder="Password" 
                            required 
                            onChange={this.onChangeHandler}
                            value={this.state.formData.password}
                            style={{border:this.state.validated.password?"":"1px solid red"}}
                        />
                        <Form.Control.Feedback type="invalid">
                            *Please enter your password.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Check
                            style={{display:"inline-block"}}
                        />
                        <label>Keep Me Signed In</label>
                    </Form.Group>
                    <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Login</button>

                    <div className="createAccountDiv">Don't have an account? Create Account</div>
                    <div className="signupBtnDiv">
                        <button className="signUpBtn"><Link to="/signup">Sign up</Link></button>
                    </div>
                    
                </Form>
            </div>
        )
    } 
}

export default withRouter(Signin);