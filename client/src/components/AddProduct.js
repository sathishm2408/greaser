import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import { Button, Header, Modal, Icon, Input, Dropdown, Accordion, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/product';
import './productCards.css';
import cam from '../assets/cam.jpg'

class AddProduct extends Component {
    state = {
        modified: false,
        gender: '',
        category: '',
        sleeveType: '',
        neckType: '',
        activeIndex: 0,
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
        pic5: ''
    }
    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        //this.props.getAllProducts();
    }

    componentDidUpdate() {
        console.log("immmmmm", this.state.pic1);
    }

    getGender = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ gender: value, modified: true })
    }

    getSleeveType = (event, { value }) => {
        console.log("innnn", value);
        //this.setState({modified: true})
        this.setState({ sleeveType: value, modified: true }, function () {
            console.log("innnn", this.state.modified, this.state.sleeveType);
        });

        console.log("innnn", this.state.modified, this.state.sleeveType);
    }

    getNeckType = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ neckType: value, modified: true })
    }

    getCategory = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ category: value, modified: true })
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

    preview_image = (event, img) => {
        this.setState({ modified: true })
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById(img);
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        if (img === "pic1")
            this.setState({ pic1: event.target.files[0] })
        if (img === "pic2")
            this.setState({ pic2: event.target.files[0] })
        if (img === "pic3")
            this.setState({ pic3: event.target.files[0] })
        if (img === "pic4")
            this.setState({ pic4: event.target.files[0] })
        if (img === "pic5")
            this.setState({ pic5: event.target.files[0] })
    }
    submit = () => {
        this.setState({ modified: false })
        const reqBody = {}
        reqBody.productName = document.getElementById("productName").value
        reqBody.description = document.getElementById("description").value
        // reqBody.gender = document.getElementById("gender").value
        reqBody.gender = this.state.gender
        reqBody.category = this.state.category
        reqBody.sleeveType = this.state.sleeveType
        reqBody.neckType = this.state.neckType
        reqBody.manufacturer = document.getElementById("manufacturer").value
        reqBody.salesPrice = document.getElementById("salesPrice").value
        reqBody.MRP = document.getElementById("mrp").value
        reqBody.manufactureCost = document.getElementById("manufactureCost").value
        reqBody.quantity = document.getElementById("quantity").value
        reqBody.image1 = document.getElementById("pic1").value
        reqBody.image2 = this.state.pic2;
        reqBody.image3 = this.state.pic3;
        reqBody.image4 = this.state.pic4;
        reqBody.image5 = this.state.pic5;
        console.log("reqbody", reqBody);

        this.props.addProduct(reqBody);
    }
    render() {
        console.log("aaaa", this.state.modified);

        const { activeIndex } = this.state
        const genderOptions = [
            { key: 1, text: 'Male', value: "male" },
            { key: 2, text: 'Female', value: "female" }
        ];

        const categoryOptions = [
            { key: 1, text: 'Tshirt', value: "Tshirt" },
            { key: 2, text: 'Shirt', value: "Shirt" },
            { key: 3, text: 'Denim', value: "Denim" },
            { key: 4, text: 'Joggers', value: "Joggers" },
            { key: 5, text: 'Trousers', value: "Trousers" }
        ];

        const sleeveOptions = [
            { key: 1, text: 'Half Hand', value: "Half Hand" },
            { key: 2, text: 'Full Hand', value: "Full Hand" },
            { key: 3, text: 'Sleeveless', value: "Sleeveless" }
        ];

        const neckTypeOptions = [
            { key: 1, text: 'Round Neck', value: "Round Neck" },
            { key: 2, text: 'V Neck', value: "V Neck" },
            { key: 3, text: 'Polo', value: "Polo" },
            { key: 4, text: 'Hooded', value: "Hooded" }
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
                        Product Image
                </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div className="flexFooter">

                            <div class="d-flex flex-row">
                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top productimg' id="pic1" src={cam} alt="products"></img>

                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic1) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic1")} />
                                                            :
                                                            <button >Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div class="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top productimg' id="pic2" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic2) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic2")} />
                                                            :
                                                            <button >Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div class="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top productimg' id="pic3" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic3) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic3")} />
                                                            :
                                                            <button >Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div class="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top productimg' id="pic4" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic4) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic4")} />
                                                            :
                                                            <button >Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div class="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize" >

                                            <div className="card-body">
                                                <img className='card-img-top productimg' id="pic5" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic5) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic5")} />
                                                            :
                                                            <button >Remove</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Info
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
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
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Types
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>

                        <div className="AddProduct-field">
                            <label className="label-field">Gender</label>
                            <Dropdown placeholder='gender' id="gender" selection={true} options={genderOptions} onChange={this.getGender} />
                            <label className="label-field">Category</label>
                            <Dropdown placeholder='category' id="category" selection={true} options={categoryOptions} onChange={this.getCategory} />
                        </div>
                        {
                            (this.state.category === "Tshirt") ?
                                <div className="AddProduct-field">
                                    <label className="label-field">Sleeve Type</label>
                                    <Dropdown placeholder='category' id="sleeveType" selection={true} options={sleeveOptions} onChange={this.getSleeveType} />
                                    <label className="label-field">Neck Type</label>
                                    <Dropdown placeholder='category' id="neckType" selection={true} options={neckTypeOptions} onChange={this.getNeckType} />
                                </div>:(null)
                        }
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Prices
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <div className="AddProduct-field">
                            <label className="label-field">SalesPrice</label>
                            <Input type="number" id="salesPrice" name="salesPrice" placeholder="Enter price" />
                            <label className="label-field">MRP</label>
                            <Input type="number" id="mrp" name="mrp" placeholder="Enter price" />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">Making Cost</label>
                            <Input type="number" id="manufactureCost" name="manufactureCost" placeholder="Enter price" />
                            <label className="label-field">Manufacturer</label>
                            <Input type="text" id="manufacturer" name="manufacturer" placeholder="manufacturer" />
                        </div>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 4}
                        index={4}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Inventory
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 4}>

                        <div className="AddProduct-field">
                            <label className="label-field">quantity</label>
                            <Input type="number" id="quantity" name="quantity" placeholder="Enter quantity" />
                        </div>
                        <div className="AddProduct-field">
                            <Button positive onClick={() => this.submit()}>SUBMIT</Button>
                        </div>
                    </Accordion.Content>
                </Accordion>
                <Prompt when={this.state.modified} message="Are you sure you want to leave this page?"></Prompt>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return { addedProducts: state.products.productData }
}

export default connect(mapStateToProps, { addProduct })(AddProduct)