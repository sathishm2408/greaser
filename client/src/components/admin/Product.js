import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { getProductDetails } from '../../actions/product'
import './productCards.css';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

class Product extends Component {

    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        this.props.getProductDetails(this.props.match.params.id);
    }
    handleOnDragStart = (e) => e.preventDefault()

    render() {
        let baseUrl = 'http://localhost:3005/'
        console.log("333333333 in cards", this.props.productDetails)
        const product = this.props.productDetails;
        if(product)
        var carousalImages = product.images.map((fileImg)=>
        <img src={baseUrl + `${fileImg}`} onDragStart={this.handleOnDragStart} className="img-size" alt='product_image' />
        )
        return (
            <div className="product-img">
                <div className='viewProduct img-padding' >
                    {product && <AliceCarousel mouseTrackingEnabled autoPlay={true} autoPlayInterval={4000} autoHeight={true} >
                        {carousalImages}
                    </AliceCarousel>}

                </div>

                <div className='padding-rt'>
                    {product &&
                        <div>
                            < Card >
                                <Card.Header as="h5">{product.productName}</Card.Header>
                                <Card.Body>
                                    <p>
                                        <strong>Category:</strong>{product.category}
                                    </p>
                                    <p>
                                        <strong>
                                            MRP:
                                        </strong>
                                        <strike>₹{product.MRP}</strike>
                                    </p>
                                    <p>
                                        <strong>
                                            OfferPrize:
                                        </strong>
                                        ₹{product.salesPrice}
                                    </p>
                                    <p>
                                        <strong>
                                            Manufacturer:
                                        </strong>
                                        {product.manufacturer}
                                    </p>
                                    <Card.Title>Description:</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>


                                    <a href='/admin'><Button variant="primary" className='btn-right'>Back</Button></a>
                                </Card.Body>
                            </Card>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return { productDetails: state.products.productDetails }
}

export default connect(mapStateToProps, { getProductDetails })(withRouter(Product))