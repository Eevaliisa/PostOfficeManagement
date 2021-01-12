import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class ShipmentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            shipmentId: '',
            shipments: []
        };   
        this.handleClick = this.handleClick.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatBoolean = this.formatBoolean.bind(this);
    }

    async componentDidMount() {
        this.setState({ isFetching: true})
        const result = await fetch("http://localhost:5000/api/shipment");
        const shipments = await result.json();
        this.setState({ shipments, isFetching: false });
    }

    handleClick(id){
        this.setState({ shipmentId: id });
        window.location.href = `/bags-list?id=${id}`;
        console.log(id);
    }
    formatDate(date) {
        return new Date(date).toLocaleString("en-GB");
    }
    
    formatBoolean(isFinalized) {
         return isFinalized ? "Yes" : "No";
    }

    renderTableData() {
        return this.state.shipments.map((shipment, index) => {
            const {
                shipmentId, 
                destinationAirport, 
                flightNumber, 
                flightDateTime, 
                isFinalized } = shipment
            return (
                <tr key={ shipmentId } id={ shipmentId } onClick={() => this.handleClick(shipmentId)}>
                    <td>{ shipmentId }</td>
                    <td>{ destinationAirport }</td>
                    <td>{ flightNumber }</td>
                    <td>{ this.formatDate(flightDateTime) }</td>
                    <td>{ this.formatBoolean(isFinalized) }</td>
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
                <h1 className="list-title">Shipments
                    <Link to="/add-shipment" className="btn btn-success btn-lg float-right" type="button">
                        Add new shipment
                    </Link>
                </h1>
                <div id="shipments-table-div">
                <table id="data-list" className="table data-list">
                    <thead>
                        <tr>
                            <th scope="col">Shipment ID</th>
                            <th scope="col">Destination Airport</th>
                            <th scope="col">Flight Number</th>
                            <th scope="col">Flight Date</th>
                            <th scope="col">Finalized</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                 </table>
                </div>
            </div>

                ); 
                }
                
    }
}