import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Promotions.css'



class Promotions extends Component{
     state={
        sources:[]
    }
    componentDidMount(){
        axios.get(`http://localhost:5000/promotions?category=${this.props.category}`).then((response) =>{
            console.log("kkkkk",response);
            this.setState({sources:response.data});
        })
    }
    render(){
        console.log(this.state)
        if(this.state.sources.length === 0){
            return("")
        }
        else{
        return(
            
            <Carousel className="pro_image">
            <Carousel.Item className="pro_item">
          <img  src={this.state.sources[0].url}  alt="First slide" 
         />
           </Carousel.Item>
          <Carousel.Item className="pro_item">
          <img src={this.state.sources[1].url} alt="second slide" 
           />
          </Carousel.Item>
         <Carousel.Item className="pro_item">
         <img
         
          src={this.state.sources[2].url}
          alt="Third slide" 
         />
       </Carousel.Item>
       </Carousel>
       
        )
        }

  

    }
}

export default Promotions;