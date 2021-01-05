import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

export class GetParcelsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            bagId: new URLSearchParams(window.location.search).get('id'),
            parcelsList: [],
        };
    }
    
    getTotalPriceOfParcels() {
        let total = 0;
        for (let i=0; i < this.state.parcelsList.length; i++) {
            total = total + this.state.parcelsList[i].price;
        }
        return total;
    }
    
    async componentDidMount() {
        console.log(this.state.bagId)
        const result = await fetch(`http://localhost:5000/api/parcel/${this.state.bagId}/parcels`);
        const parcelsList = await result.json();
        this.setState({ parcelsList, isFetching:false });
        console.log(result);
    }
    handleClick(){
        window.location.href = `/add-parcel?id=${this.state.bagId}`;
    }

    renderParcelTableData() {
        return this.state.parcelsList.map((parcel) => {
            const {parcelId, recipientName, destinationCountryCode, weightInKg, price } = parcel
            return (
                <tr key={parcelId}>
                    <td>{parcelId}</td>
                    <td>{recipientName}</td>
                    <td>{weightInKg}</td>
                    <td>{price}</td>
                    <td>{destinationCountryCode}</td>
                    <td>{this.state.bagId}</td>
                </tr>
            )
        })
    }

    render() {
        if (this.state.parcelsList.isFetching) {
            return <div>Loading Data...</div>;
        } else {
            return(
                <div>
                    <h2 className="list-title">
                        <Link to="/" className="btn btn-secondary float-left">Back</Link>
                        Parcels in bag no {this.state.bagId}
                        <Button className="btn btn-danger float-right" onClick={() => this.handleClick()}>Add New Parcel</Button>
                    </h2>
                    <table className="table data-list">
                        <thead>
                        <tr>
                            <th scope="col">Parcel ID</th>
                            <th scope="col">Recipient's Name</th>
                            <th scope="col">Weight in KG</th>
                            <th scope="col">Price</th>
                            <th scope="col">Destination Country Code</th>
                            <th scope="col">Bag Id</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderParcelTableData()}
                        <tr>
                            <th scope="col">Total number of parcels:</th>
                            <th scope="col">{ this.state.parcelsList.length }</th>
                        </tr>
                        <tr>
                            <th scope="col">Total price: </th>
                            <th scope="col">{ this.getTotalPriceOfParcels() }</th>
                        </tr>
                        </tbody>
                    </table>
                </div>

            );
        }
    }
}