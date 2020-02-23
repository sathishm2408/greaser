import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

export default class Chart extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("chhhhh",this.props.data);
        
        return (
            <div className="chart">
                Chart component
                <Bar
                    data={this.props.data}
                    width={80}
                    height={350}
                    options={{ maintainAspectRatio: false }}
                />
               
            </div>
        )
    }
}