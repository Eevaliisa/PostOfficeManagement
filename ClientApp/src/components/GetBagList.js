import React, { Component } from 'react';

export class GetBagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            shipmentId: new URLSearchParams(window.location.search).get('id'),
            letterBags: [],
            parcelBags: []
        };    
    }
    
    async getAllLetterBags() {
        console.log(this.state.shipmentId)
        const result = await fetch(`http://localhost:5000/api/letterbag/${this.state.shipmentId}/bagList`);
        const letterBags = await result.json();
        this.setState({ letterBags, isFetching: false });
        console.log(result);
    }
    
    async getAllParcelBags() {
        console.log(this.state.shipmentId)
        const result = await fetch(`http://localhost:5000/api/parcelbag/${this.state.shipmentId}/bagList`);
        const parcelBags = await result.json();
        this.setState({ parcelBags, isFetching: false });
        console.log(result);
    }

    async componentDidMount() {
        await this.getAllLetterBags();
        await this.getAllParcelBags();
    }

    renderTableData() {
        return this.state.letterBags.map((letterBag) => {
            const {bagId, totalPrice, lettersCount, destinationCountryCode, shipmentId } = letterBag
            return (
                <tr key={bagId}>
                    <td>{bagId}</td>
                    <td>Bag of Letters</td>
                    <td>{totalPrice}</td>
                    <td>{lettersCount}</td>
                    <td>0</td>
                    <td>{destinationCountryCode}</td>
                    <td>{shipmentId}</td>
                </tr>
            )
        })
    }
    
    renderParcelTableData() {
        return this.state.parcelBags.map((parcelBag) => {
            const {bagId, destinationCountryCode, shipmentId } = parcelBag
            return (
                <tr key={bagId}>
                    <td>{bagId}</td>
                    <td>Bag of Parcels</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{destinationCountryCode}</td>
                    <td>{shipmentId}</td>
                </tr>
            )
        })
    }

    render() {
        if (this.state.letterBags.isFetching) {
            return <div>Loading Data...</div>;
         } else {
            return(
            <div>
                <h2 className="list-title">Bags in shipment no {this.state.shipmentId}</h2>
                <table className="table data-list">
                    <thead>
                        <tr>
                            <th scope="col">Bag ID</th>
                            <th scope="col">Type of Bag</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Letters Count</th>
                            <th scope="col">Parcels Count</th>
                            <th scope="col">Destination Country Code</th>
                            <th scope="col">Shipment ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                        {this.renderParcelTableData()}
                    </tbody>
                 </table>
            </div>

            ); 
            }
         }

}