import React, { Component } from 'react';

export class GetLetterBagList extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isFetching: false,
    //         shipmentId: this.props.shipmentId,
    //         letterBags: []
    //     };    
    // }

    // async componentDidMount() {
    //     this.setState({ isFetching: true})
    //     const result = await fetch(`http://localhost:5000/api/letterbag/${shipmentId}/bagslist`);
    //     const shipments = await result.json();
    //     this.setState({ letterBags, isFetching: false });
    // }

    // renderTableData() {
    //     return this.state.letterBags.map((letterbag) => {
    //         const {bagId, totalWeight, totalPrice, lettersCount, destinationCountryCode, shipmentId } = letterbag
    //         return (
    //             <tr key={bagId}>
    //                 <td>{bagId}</td>
    //                 <td>Bag of Letters</td>
    //                 <td>{totalWeight}</td>
    //                 <td>{totalPrice}</td>
    //                 <td>{lettersCount}</td>
    //                 <td>{destinationCountryCode}</td>
    //                 <td>{shipmentId}</td>
    //             </tr>
    //         )
    //     })
    // }

    // render() {
    //     if (this.state.letterBags.isFetching) {
    //         return <div>Loading Data...</div>;
    //      } else {
    //         return(
    //         <div>
    //             <h1 className="list-title">Bags in shipment no {shipmentId}</h1>
    //             <table className="table data-list">
    //                 <thead>
    //                     <tr>
    //                     <th scope="col">Bag ID</th>
    //                     <th scope="col">Type of Bag</th>
    //                     <th scope="col">Total Weight</th>
    //                     <th scope="col">Total Price</th>
    //                     <th scope="col">Letters Count</th>
    //                     <th scope="col">Destination Country Code</th>
    //                     <th scope="col">Shipment ID</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.renderTableData()}
    //                 </tbody>
    //              </table>
    //         </div>

    //         ); 
    //         }
    //      }

}