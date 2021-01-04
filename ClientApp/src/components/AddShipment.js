import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

const AddShipmentSchema = Yup.object().shape({

    shipmentId: Yup.string()
        .matches(/^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{6}$/,
            "Incorrect format. Please use format XXX-XXXXXX where X is a letter or a number.")
        .required("Shipment Id is required"),
    destinationAirport: Yup.string()  
        .matches(/^[a-zA-Z]{3}$/,
            "Incorrect format, please use one of possible values: TLL, RIX or HEL.")    
        .required("Destination airport is required."),
    flightNumber: Yup.string()
        .matches(/^[a-zA-Z]{2}[0-9]{4}$/,
            "Incorrect format, pleas use format LLNNNN where L - letter and N - number.")
        .required("Flight number is required."),
    flightDateTime: Yup.string()
        .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
        "Incorrect format, please use following format: yyyy-mm-dd hh:mm:ss")
        .required("Flight date is required.")
});

export class AddShipment extends Component {
    
    render() {
        return (
            <div>
                <h2 className="list-title">Add New Shipment</h2>

                <Formik
                    initialValues={{shipmentId: "", destinationAirport: "", flightNumber: "", flightDateTime: ""}}
                    validationSchema={AddShipmentSchema}
                    onSubmit={(values, { setSubmitting }) => {
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
                            { errors.shipmentId && touched.shipmentId }
                        <ErrorMessage
                            component="div"
                            name="shipmentId"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationAirport">Destination Airport</label>
                        <Field 
                            type="text" 
                            name="destinationAirport" 
                            className="form-control" 
                            id="destinationAirport" 
                            placeholder="possible values are TLL, RIX or HEL"/>
                            { errors.destinationAirport && touched.destinationAirport }
                        <ErrorMessage
                            component="div"
                            name="destinationAirport"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number</label>
                        <Field
                            type="text" 
                            name="flightNumber" 
                            className="form-control" 
                            id="flightNumber" 
                            placeholder="Use format LLNNNN where L - letter, N - number"/>
                            { errors.flightNumber && touched.flightNumber }
                        <ErrorMessage
                            component="div"
                            name="flightNumber"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightDateTime">Flight Date</label>
                        <Field 
                            type="text" 
                            name="flightDateTime" 
                            className="form-control" 
                            id="flightDateTime" 
                            placeholder="Use format YYYY-MM-DD hh:mm:ss"/>
                            { errors.flightDateTime && touched.flightDateTime }
                        <ErrorMessage
                            component="div"
                            name="flightDateTime"
                            className="text-danger"
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Add Shipment</button>
                    </Form>
                    )}
                </Formik>
            </div>
        )
    }
}