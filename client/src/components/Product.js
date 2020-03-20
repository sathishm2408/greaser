import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Figure, Card, Button } from 'react-bootstrap';
import { getProductDetails } from '../actions/product'
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
        const product = this.props.productDetails
        return (
            <div className="product-img">
                <div className='viewProduct'>
                    {product && <AliceCarousel mouseTrackingEnabled autoPlay={true} autoPlayInterval={3000}>
                        <img src={baseUrl + `${product.image1}`} onDragStart={this.handleOnDragStart} className="yours-custom-class" alt='uygyugygy' />
                        <img src={baseUrl + `${product.image2}`} onDragStart={this.handleOnDragStart} className="yours-custom-class" alt='uygyugygy' />
                        <img src={baseUrl + `${product.image3}`} onDragStart={this.handleOnDragStart} className="yours-custom-class" alt='uygyugygy' />
                        <img src={baseUrl + `${product.image4}`} onDragStart={this.handleOnDragStart} className="yours-custom-class" alt='uygyugygy' />
                        <img src={baseUrl + `${product.image5}`} onDragStart={this.handleOnDragStart} className="yours-custom-class" alt='uygyugygy' />
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
    return { productDetails: state.products.productData }
}

export default connect(mapStateToProps, { getProductDetails })(withRouter(Product))