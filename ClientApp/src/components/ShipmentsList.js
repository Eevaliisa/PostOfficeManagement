import React, { Component } from 'react';

export class ShipmentsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            shipmentId: '',
            shipments: []
        };   
        this.handleClick = this.handleClick.bind(this); 
    }

    async componentDidMount() {
        this.setState({ isFetching: true})
        const result = await fetch('http://localhost:5000/api/shipment');
        const shipments = await result.json();
        this.setState({ shipments, isFetching: false });
    }

    handleClick(id){
        this.setState({ shipmentId: id });
        window.location.href = `/get-bags-list?id=${id}`;
        console.log(id);

     }

    renderTableData() {
        return this.state.shipments.map((shipment, index) => {
            const {shipmentId, destinationAirport, flightNumber, flightDateTime, isFinalized } = shipment
            return (
                <tr key={shipmentId} id={shipmentId} onClick={() => this.handleClick(shipmentId)}>
                    <td>{shipmentId}</td>
                    <td>{destinationAirport}</td>
                    <td>{flightNumber}</td>
                    <td>{flightDateTime}</td>
                    <td>{String(isFinalized)}</td>
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
                <h1 className="list-title">Shipments</h1>
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

                ); 
                }
                
    }
}