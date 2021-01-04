import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";

const AddShipmentSchema = Yup.object().shape({

    shipmentId: Yup.string()
        .matches(/^[0-9a-zA-Z]{3}\-[0-9a-zA-Z]{6}$/,
            "Incorrect format. Please use format XXX-XXXXXX")
        .required("Shipment Id is required"),    
});

export class AddShipment extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
            
    //         shipmentId: "",
    //         destinationAirport: "",
    //         flightNumber: "",
    //         flightDateTime: "",

    //     };    
        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     });
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
        
    //     fetch('http://localhost:5000/api/shipment', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify(this.state)
    //       }).then((response) => {
    //         console.log(response)
    //         return response.json();
    //       });
    //     console.log(this.state);   
    // }

    render() {
        return (
            <div>
                <h2>Add New Shipment</h2>

                <Formik
                    initialValues={{shipmentId: "", destinationAirport: "", flightNumber: "", flightDateTime: ""}}
                    validationSchema={AddShipmentSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('submitting')
                        fetch('http://localhost:5000/api/shipment', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)
                            }).then((response) => {
                                console.log(response)
                                return response.json();
                            });
                            console.log(this.state);
                            console.log('submitted')

                     setSubmitting(false);
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                    <div className="form-group">
                        <label htmlFor="shipmentId">Shipment ID</label>
                        <Field name="shipmentId" 
                            className="form-control" 
                            placeholder="Use following the format: XXX-XXXXXX"/>
                            {errors.shipmentId && touched.shipmentId ? (
                            <div>{errors.shipmentId}</div>
                            ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationAirport">Destination Airport</label>
                        <Field 
                            type="text" 
                            name="destinationAirport" 
                            className="form-control" 
                            id="destinationAirport" 
                            placeholder="possible values are TLL, RIX or HEL"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number</label>
                        <Field
                            type="text" 
                            name="flightNumber" 
                            className="form-control" 
                            id="flightNumber" 
                            placeholder="Use format LLNNNN where L - letter, N - number"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightDateTime">Flight Date</label>
                        <Field 
                            type="text" 
                            name="flightDateTime" 
                            className="form-control" 
                            id="flightDateTime" 
                            placeholder="Use format YYYY-MM-DD"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Add Shipment</button>
                    </Form>
                    )}
                </Formik>
            </div>
        )
    }
}