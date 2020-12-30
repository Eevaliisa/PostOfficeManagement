import React, { Component } from 'react';

export class AddShipment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            shipmentId: "",
            destinationAirport: "",
            flightNumber: "",
            flightDateTime: "",

        };    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('http://localhost:5000/api/shipment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
          }).then((response) => {
            console.log(response)
            return response.json();
          });
        console.log(this.state)
        
    }

    render() {
        return (
            <div>
                <h2>Add New Shipment</h2>

                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="shipment-id">Shipment ID</label>
                        <input 
                            type="text" 
                            name="shipmentId"
                            onChange={this.handleInputChange} 
                            value = {this.props.shipmentId} 
                            className="form-control" 
                            id="shipment-id" 
                            placeholder="Use following the format: XXX-XXXXXX"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="airport">Destination Airport</label>
                        <input 
                            type="text" 
                            name="destinationAirport"
                            onChange={this.handleInputChange} 
                            value = {this.props.destinationAirport} 
                            className="form-control" 
                            id="airport" 
                            placeholder="possible values are TLL, RIX or HEL"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flight-number">Flight Number</label>
                        <input 
                            type="text" 
                            name="flightNumber"
                            onChange={this.handleInputChange} 
                            value = {this.props.flightNumber} 
                            className="form-control" 
                            id="flight-number" 
                            placeholder="Use format LLNNNN where L - letter, N - number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flight-date">Flight Number</label>
                        <input 
                            type="text" 
                            name="flightDateTime"
                            onChange={this.handleInputChange} 
                            value = {this.props.flightDateTime} 
                            className="form-control" 
                            id="flight-date" 
                            placeholder="Use format YYYY-MM-DD"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Add Shipment</button>
                    </form>
            </div>
        )
    }
}