import React, { Component } from 'react';
import { Button, Header, Modal, Icon, Input,Dropdown } from 'semantic-ui-react';
import './productCards.css';

export default class AddProduct extends Component {
   
    render() {
        const genderOptions=[
            { key: 1, text: 'Male', value: "male" },
            { key: 2, text: 'Female', value: "female" }
          ];

          const categoryOptions=[
            { key: 1, text: 'Tshirt', value: "Tshirt" },
            { key: 2, text: 'Shirt', value: "Shirt" },
            { key: 1, text: 'Denim', value: "Denim" },
            { key: 2, text: 'tracks', value: "tracks" }
          ];
        return (
            <div className="AddProduct-body">
                <div className="AddProduct-field">
                    <label className="label-field">Product Name</label>
                    <Input type="text" id="productName" name="productName" autoFocus placeholder="Enter productName." />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">Description</label>
                    <Input type="text" id="Description" name="Description" placeholder="Enter Description" />
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">gender</label>
                    <Dropdown placeholder='gender' name="gender" selection options={genderOptions} />
                    {/* <Input type="text" id="gender" name="gender" placeholder="Enter gender" /> */}
                </div>
                <div className="AddProduct-field">
                    <label className="label-field">category</label>
                    <Dropdown placeholder='category' name="category" selection options={categoryOptions} />
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
               
            </div>
        )
    }
}
