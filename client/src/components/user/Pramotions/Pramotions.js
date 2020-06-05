import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Pramotions.css'



class Pramotions extends Component{
     state={
        sources:[]
    }
    componentDidMount(){
        axios.get(`http://localhost:5000/Promotions`).then((response) =>{
            console.log(response);
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
            
            <Carousel>
            <Carousel.Item className="pro_item">
          <img  src={this.state.sources[0].url}  alt="First slide" 
         />
           </Carousel.Item>
          <Carousel.Item className="pro_item">
          <img src={this.state.sources[1].url} alt="second slide" 
           />
          </Carousel.Item>
         <Carousel.Item className="pro_item">
         <img src={this.state.sources[2].url}
          alt="Third slide" 
         />
       </Carousel.Item>
       </Carousel>
       
        )
        }

  

    }
}

export default Pramotions;