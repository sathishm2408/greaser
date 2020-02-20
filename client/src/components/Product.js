import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Figure, Card, Button } from 'react-bootstrap';
import {getProductDetails} from '../actions/product'
import './productCards.css';

class Product extends Component {

    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        this.props.getProductDetails(this.props.match.params.id);
    }

    render() {
        console.log("333333333 in cards", this.props)
        return (
            <div className="product-img">
                <div >
                    <Figure className='padding-rt1'>
                        <Figure.Image
                            width={350}
                            height={300}
                            alt="171x180"
                            src="https://www.bing.com/th?id=OIP.S8CwhNPJxY-3JbRolUEsHwHaFj&w=262&h=189&c=7&o=5&dpr=2&pid=1.7"
                            thumbnail={true}
                            roundedCircle={true}
                        />
                        <Figure.Caption>
                            Nulla vitae elit libero, a pharetra augue mollis interdum.
                     </Figure.Caption>
                    </Figure>

                </div>

                <div className='padding-rt'>
                    <Card>
                        <Card.Header as="h5">Oneplus 7T</Card.Header>
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                             </Card.Text>
                            <Button variant="primary" className='btn-right'>Go somewhere</Button>
                        </Card.Body>
                    </Card>
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