import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";

export class GetBagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            shipmentId: new URLSearchParams(window.location.search).get("id"),
            shipment: { },
            isFinalized: false,
            showSuccess: false,
            letterBags: [],
            parcelBags: [],
        };
        this.handleParcelBagClick = this.handleParcelBagClick.bind(this);
        this.handleFinalizeClick = this.handleFinalizeClick.bind(this);
        this.handleAddLetterBagClick = this.handleAddLetterBagClick.bind(this);
        this.handleAddParcelBagClick = this.handleAddParcelBagClick.bind(this);
    }
    
    async getAllLetterBags() {
        const result = await fetch(`http://localhost:5000/api/letterbag/${ this.state.shipmentId }/bagList`);
        const letterBags = await result.json();
        this.setState({ letterBags, isFetching: false });
    }
    
    async getAllParcelBags() {
        const result = await fetch(`http://localhost:5000/api/parcelbag/${ this.state.shipmentId }/bagList`);
        const parcelBags = await result.json();
        this.setState({ parcelBags, isFetching: false });
    }
    
    async getShipment() {
        const result = await fetch(`http://localhost:5000/api/shipment/${ this.state.shipmentId }`);
        const shipment = await result.json();
        this.setState({ shipment, isFinalized: shipment.isFinalized, isFetching: false });
    }
    
    async componentDidMount() {
        await this.getAllLetterBags();
        await this.getAllParcelBags();
        await this.getShipment();
    }

    handleParcelBagClick(id) {
        this.setState({ bagId: id });
        window.location.href = `/parcels-list?id=${id}`;
    }
    
    handleAddLetterBagClick() {
        window.location.href = `/add-letter-bag?id=${ this.state.shipmentId }`;
    }
    
    handleAddParcelBagClick() {
        window.location.href = `/add-parcel-bag?id=${ this.state.shipmentId }`;
    }
    
    handleFinalizeClick() {
        fetch(`http://localhost:5000/api/shipment/${ this.state.shipmentId }`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ showSuccess: true });
            }
        });
        
    }
    
    renderLetterBagTableData() {
        return this.state.letterBags.map((letterBag) => {
            const {
                bagId, 
                totalPrice, 
                lettersCount, 
                destinationCountryCode, 
                shipmentId } = letterBag
            return (
                <tr key={ bagId }>
                    <td>{ bagId }</td>
                    <td>Bag of Letters</td>
                    <td>{ totalPrice }</td>
                    <td>{ lettersCount }</td>
                    <td>{ destinationCountryCode }</td>
                    <td>{ shipmentId }</td>
                </tr>
            )
        })
    }
    
    renderParcelBagTableData() {
        return this.state.parcelBags.map((parcelBag) => {
            const { bagId, destinationCountryCode, shipmentId } = parcelBag
            return (
                <tr key={ bagId } id={ bagId } onClick={() => this.handleParcelBagClick(bagId)}>
                    <td>{ bagId }</td>
                    <td>Bag of Parcels</td>
                    <td>Click to see list of parcels</td>
                    <td>0</td>
                    <td>{ destinationCountryCode }</td>
                    <td>{ shipmentId }</td>
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
                <h2 className="list-title">
                    <Link to="/" className="btn btn-secondary float-left">Back</Link>
                    Bags in shipment no { this.state.shipmentId }
                </h2>
                <div className="align-content-center">
                <Button disabled={ this.state.isFinalized }
                        className="btn btn-success" 
                        onClick={() => this.handleAddLetterBagClick()}>Add New Bag of Letters</Button>
                <Button disabled={ this.state.isFinalized } 
                        className="btn btn-success float-right"
                        onClick={() => this.handleAddParcelBagClick()}>Add New Bag of Parcels</Button>
                </div>
                <table className="table data-list">
                    <thead>
                        <tr>
                            <th scope="col">Bag ID</th>
                            <th scope="col">Type of Bag</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Letters Count</th>
                            <th scope="col">Destination Country</th>
                            <th scope="col">Shipment ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLetterBagTableData()}
                        {this.renderParcelBagTableData()}
                    </tbody>
                 </table>
                { this.state.showSuccess &&
                setTimeout(() => this.setState({ showSuccess: false }),5000) &&
                <div className="alert alert-success" >
                    Success! Shipment finalized!
                </div> }
                <Button className="btn btn-danger" 
                        onClick={this.handleFinalizeClick}
                        disabled={
                            (this.state.letterBags.length === 0 && this.state.parcelBags.length === 0 )
                        || this.state.isFinalized }>Finalize Shipment</Button>
            </div>
            ); 
            }
         }

}