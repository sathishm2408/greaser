import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, InputGroup, Col, Button } from 'react-bootstrap';
import { signup } from '../../../actions/consumer';
import './Signup.css';
// import Logo from '../../asset/shoppingImage.png';
// import service from '../../Utility/Services';
import Alert from '../Alert/Alert';

class Signup extends Component {
    

        // if(!sessionStorage.getItem('registered'))
        // this.props.history.push('/admin')

        state = {
            validated: {
                firstName: true,
                lastName: true,
                emailId: true,
                mobile: true,
                password: true,
                confirmPassword: true
            },
            validation: true,
            formData: {
                firstName: "",
                lastName: "",
                emailId: "",
                mobile: "",
                password: "",
                confirmPassword: ""
            },
            showErr: false
        }

    componentDidUpdate() {
        console.log("in uuuuuuuuuuuu");
        
        if (sessionStorage.getItem('registered') === "successful")
            this.props.history.push('/signin')
    }


    onChangeHandler = (event) => {
        if (event.target.value == "") {
            this.setState({
                validated: {
                    ...this.state.validated,
                    [event.target.name]: false
                },
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                },
                showErr: false
            })
        } else {
            this.setState({
                validated: {
                    ...this.state.validated,
                    [event.target.name]: true
                },
                formData: {
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
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validation = true;
        let firstNameValid = true;
        // let lastNameValid = true;
        let emailIdValid = true;
        let mobileValid = true;
        let passValid = true;
        let cpassValid = true;
        if (this.state.formData.firstName === "" || this.state.formData.firstName == undefined) {
            validation = false;
            firstNameValid = false;
        }
        if (this.state.formData.emailId === "" || this.state.formData.emailId == undefined || !re.test(this.state.formData.emailId)) {
            validation = false;
            emailIdValid = false;
        }
        if (this.state.formData.mobile === "" || this.state.formData.mobile == undefined || this.state.formData.mobile.length < 10) {
            validation = false;
            mobileValid = false;
        }
        if (this.state.formData.password === "" || this.state.formData.password == undefined || this.state.formData.password.length < 7) {
            validation = false;
            passValid = false;
        }
        if (this.state.formData.confirmPassword === "" || this.state.formData.confirmPassword == undefined || this.state.formData.confirmPassword !== this.state.formData.password) {
            validation = false;
            cpassValid = false;
        }
        console.log(this.state);
        if (!validation) {
            this.setState({
                validated: {
                    firstName: firstNameValid,
                    emailId: emailIdValid,
                    mobile: mobileValid,
                    password: passValid,
                    confirmPassword: cpassValid
                },
                validation: false
            })
            return
        }
        else {
            console.log("everything is validated");
            this.props.signup(this.state.formData)

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


    render() {
        console.log("stssssss", this.state);

        return (
            <div>
                {/* <Alert show={this.state.showErr} variant={"danger"} msg={"Login Falied"} onClose={this.alertCloseHandler}/> */}
                <div className="logoImg">
                    {/* <img src={Logo} /> */}
                </div>
                {/* onSubmit={this.handleSubmit}  */}
                {this.state.showErr &&
                    <div className="errDiv">
                        <div className="errIcon"></div>
                        <div className="errMsg">
                            <h4>There was a problem</h4>
                            <span>Username or Paswword is incorrect.</span>
                        </div>
                    </div>}
                <Form className="myformDiv">
                    <div className="loginTitle">SignUp</div>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustomUsername">
                            <Form.Label>Firstname<sup>*</sup></Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Username"
                                required
                                onChange={this.onChangeHandler}
                                value={this.state.formData.firstName}
                                style={{ border: this.state.validated.firstName ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please enter your username.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustomUsername">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Lastname"
                                onChange={this.onChangeHandler}
                                value={this.state.formData.lastName}
                                style={{ border: this.state.validated.lastName ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please enter your username.
                        </Form.Control.Feedback>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Email ID <sup>*</sup></Form.Label>
                            <Form.Control
                                type="email"
                                name="emailId"
                                placeholder="emailId"
                                required
                                onChange={this.onChangeHandler}
                                value={this.state.formData.emailId}
                                style={{ border: this.state.validated.emailId ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please enter valid mail.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Mobile <sup>*</sup></Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                required
                                minlength="10"
                                maxlength="10"
                                onChange={this.onChangeHandler}
                                value={this.state.formData.mobile}
                                style={{ border: this.state.validated.mobile ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please enter a valid mobile number.
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
                                style={{ border: this.state.validated.password ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please enter your password.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Confirm Password <sup>*</sup></Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-Enter Password"
                                required
                                onChange={this.onChangeHandler}
                                value={this.state.formData.confirmPassword}
                                style={{ border: this.state.validated.confirmPassword ? "" : "1px solid red" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                *Please Re-enter the correct password.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Check
                            style={{ display: "inline-block" }}
                        />
                        <label>Keep Me Signed In</label>
                    </Form.Group>
                    <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Sign up</button>

                    <div className="createAccountDiv">Have an account? Click to login</div>
                    <div className="signupBtnDiv">
                        <button className="signUpBtn"><Link to="/signin">SignIn</Link></button>
                    </div>

                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
    }

}

export default connect(mapStateToProps, { signup })(withRouter(Signup));