import React, { Component } from 'react';
import { Button, Header, Modal, Icon, Input,Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';
import './productCards.css';

class AddProduct extends Component {
    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa",this.props);
        //this.props.getAllProducts();
    }

    submit=()=>{
        const reqBody ={}
        reqBody.productName = document.getElementById("productName").value
        reqBody.description = document.getElementById("description").value
        reqBody.gender = document.getElementById("gender").value
        reqBody.category = document.getElementById("category").value
        reqBody.manufacturer = document.getElementById("manufacturer").value
        reqBody.price = document.getElementById("price").value
        reqBody.quantity = document.getElementById("quantity").value
        console.log("reqbody",reqBody);
        
        this.props.addProduct(reqBody);
    }
    render() {
        const genderOptions=[
            { key: 1, text: 'Male', value: "male" },
            { key: 2, text: 'Female', value: "female" }
          ];

          const categoryOptions=[
            { key: 1, text: 'Tshirt', value: "Tshirt" },
            { key: 2, text: 'Shirt', value: "Shirt" },
            { key: 3, text: 'Denim', value: "Denim" },
            { key: 4, text: 'tracks', value: "tracks" }
          ];
        return (
            <div className="AddProduct-body">
                <div className="AddProduct-field">
                    <label className="label-field">Product Name</label>
                    <Input type="text" id="productName" name="productName" autoFocus placeholder="Enter productName." />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">Description</label>
                    <Input type="text" id="description" name="description" placeholder="Enter Description" />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">gender</label>
                    <Dropdown placeholder='gender' id="gender" selection options={genderOptions} />
                    {/* <Input type="text" id="gender" name="gender" placeholder="Enter gender" /> */}
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">category</label>
                    <Dropdown placeholder='category' id="category" selection options={categoryOptions} />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">manufacturer</label>
                    <Input type="text" id="manufacturer" name="manufacturer" placeholder="manufacturer" />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">price</label>
                    <Input type="text" id="price" name="price" placeholder="Enter price" />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">quantity</label>
                    <Input type="text" id="quantity" name="quantity" placeholder="Enter quantity" />
                </div>
                <div className="AddProduct-field">
                    <Button positive onClick={() => this.submit()}>SUBMIT</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state",state)
    return {allProducts: state.products.productData}
}

export default connect(mapStateToProps, { addProduct })(AddProduct)