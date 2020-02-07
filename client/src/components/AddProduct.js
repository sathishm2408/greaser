import React, { Component } from 'react';
import { Button, Header, Modal, Icon, Input, Dropdown, Accordion, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';
import './productCards.css';

class AddProduct extends Component {
    state = {
        gender: '',
        category: '',
        activeIndex: 0
    }
    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        //this.props.getAllProducts();
    }

    getGender = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ gender: value })
    }

    getCategory = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ category: value })
    }

    addedMessage = () => {
        alert("Product Added Successfully");
        window.location.reload();
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    submit = () => {
        const reqBody = {}
        reqBody.productName = document.getElementById("productName").value
        reqBody.description = document.getElementById("description").value
        // reqBody.gender = document.getElementById("gender").value
        reqBody.gender = this.state.gender
        reqBody.category = this.state.category
        reqBody.manufacturer = document.getElementById("manufacturer").value
        reqBody.price = document.getElementById("price").value
        reqBody.quantity = document.getElementById("quantity").value
        console.log("reqbody", reqBody);

        this.props.addProduct(reqBody);
    }
    render() {
        const { activeIndex } = this.state
        const genderOptions = [
            { key: 1, text: 'Male', value: "male" },
            { key: 2, text: 'Female', value: "female" }
        ];

        const categoryOptions = [
            { key: 1, text: 'Tshirt', value: "Tshirt" },
            { key: 2, text: 'Shirt', value: "Shirt" },
            { key: 3, text: 'Denim', value: "Denim" },
            { key: 4, text: 'tracks', value: "tracks" }
        ];

        return (

            <div>
                {
                    (this.props.addedProducts) ? this.addedMessage() : null
                }
                <Accordion styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Info
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div className="AddProduct-field">
                            <label className="label-field">Product Name</label>
                            <Input type="text" id="productName" name="productName" autoFocus placeholder="Enter productName." />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">Description</label>
                            <Input type="text" id="description" name="description" placeholder="Enter Description" />
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Types
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>

                        <div className="AddProduct-field">
                            <label className="label-field">gender</label>
                            <Dropdown placeholder='gender' id="gender" selection={true} options={genderOptions} onChange={this.getGender} />
                            {/* <Input type="text" id="gender" name="gender" placeholder="Enter gender" /> */}
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">category</label>
                            <Dropdown placeholder='category' id="category" selection={true} options={categoryOptions} onChange={this.getCategory} />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">manufacturer</label>
                            <Input type="text" id="manufacturer" name="manufacturer" placeholder="manufacturer" />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">price</label>
                            <Input type="number" id="price" name="price" placeholder="Enter price" />
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Inventory
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>

                        <div className="AddProduct-field">
                            <label className="label-field">quantity</label>
                            <Input type="number" id="quantity" name="quantity" placeholder="Enter quantity" />
                        </div>
                        <div className="AddProduct-field">
                            <Button positive onClick={() => this.submit()}>SUBMIT</Button>
                        </div>
                    </Accordion.Content>
                </Accordion>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return { addedProducts: state.products.productData }
}

export default connect(mapStateToProps, { addProduct })(AddProduct)