import React from 'react';
import './Home.css'
import Pramotions from '../Pramotions/Pramotions';
import Popular from '../Popular/Popular'
import Filters from '../Filters/Filters'

class Home extends React.Component{
    render(){
        return(
            <div className="homeDiv">
                <Filters />
                <Pramotions /> 
                <Popular />
            </div>
            

        )
    }

}
 

export default Home;