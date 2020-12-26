import React, { Component } from 'react';

export class Shipment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            shipments: []
        };    
    }

    async componentDidMount() {
        this.setState({ isFetching: true})
        const result = await fetch('http://localhost:5000/api/shipment');
        const shipments = await result.json();
        this.setState({ shipments, isFetching: false });
    }

    // renderTableHeader() {
    //     let header = Object.keys(this.state.shipments[0])
    //     return header.map((key, index) => {
    //        return <th key={index}>{key.toUpperCase()}</th>
    //     })
    //  }

    renderTableData() {
        return this.state.shipments.map((shipment, index) => {
            const {shipmentId, destinationAirport, flightNumber, flightDateTime } = shipment
            return (
                <tr key={shipmentId}>
                    <td>{shipmentId}</td>
                    <td>{destinationAirport}</td>
                    <td>{flightNumber}</td>
                    <td>{flightDateTime}</td>
                </tr>
            )
        })
    }

    render() {
        if (this.state.shipments.isFetching) {
            return <div>Loading Data...</div>;
         } else {
            return(
            <div>
                <h1 id="shipments-list-title">Shipments</h1>
                <table id="shipments-list" className="table shipments-list">
                    <thead>
                        <tr>
                        <th scope="col">Shipment Number</th>
                        <th scope="col">Destination Airport</th>
                        <th scope="col">Flight Number</th>
                        <th scope="col">Flight Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>{this.renderTableHeader()}</tr> */}
                        {this.renderTableData()}
                    </tbody>
                 </table>
            </div>
                ); 
                }
                
        
    }


}