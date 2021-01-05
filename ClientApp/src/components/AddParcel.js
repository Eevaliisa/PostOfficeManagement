﻿import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {Link} from "react-router-dom";

const AddParcelSchema = Yup.object().shape({

    parcelId: Yup.string()
        .matches(/^[a-zA-Z]{2}[0-9]{6}[a-zA-Z]{2}$/,
            "Incorrect format. Please use format LLNNNNNNLL where L is a letter and N is a number.")
        .required("Parcel Id is required"),
    recipientName: Yup.string()
        .max(100, "Name cannot be longer than 100 characters")
        .required("Recipient's name is required."),
    weightInKg: Yup.number()
        .positive("Weight cannot be less than 0.")
        .required("Weight is required."),
    price: Yup.number()
        .positive("Price cannot be less than 0.")
        .required("Price is required."),
    destinationCountryCode: Yup.string()
        .matches(/^[a-zA-Z]{2}$/, 
            "Incorrect format! Please use two letters format e.g EE")
        .required(),
});

export class AddParcel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bagId: new URLSearchParams(window.location.search).get('id')
        };
    }

    render() {
        return (
            <div>
                <h2 className="list-title">
                    <Link to="/" className="btn btn-secondary float-left">Back</Link>
                    Add new parcel to bag no {this.state.bagId}</h2>
                <Formik
                    initialValues={{
                        parcelId: "",
                        recipientName: "",
                        weightInKg: "",
                        price: "",
                        destinationCountryCode: "",
                        bagId: this.state.bagId }}
                    validationSchema={AddParcelSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        fetch('http://localhost:5000/api/parcel', {
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
                                <label htmlFor="parcelId">Parcel ID</label>
                                <Field name="parcelId"
                                       className="form-control"
                                       placeholder="Use following the format: LLNNNNNNLL where L is letter and N is number"/>
                                { errors.ParcelId && touched.ParcelId }
                                <ErrorMessage
                                    component="div"
                                    name="parcelId"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipientName">Recipient's Name</label>
                                <Field
                                    type="text"
                                    name="recipientName"
                                    className="form-control"
                                    id="recipientName"/>
                                { errors.recipientName && touched.recipientName }
                                <ErrorMessage
                                    component="div"
                                    name="recipientName"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weightInKg">Parcel weight in Kg</label>
                                <Field
                                    type="text"
                                    name="weightInKg"
                                    className="form-control"
                                    id="weightInKg"/>
                                { errors.weightInKg && touched.weightInKg }
                                <ErrorMessage
                                    component="div"
                                    name="weightInKg"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <Field
                                    type="text"
                                    name="price"
                                    className="form-control"
                                    id="price"/>
                                { errors.price && touched.price }
                                <ErrorMessage
                                    component="div"
                                    name="price"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="destinationCountryCode">Destination Country Code</label>
                                <Field
                                    type="text"
                                    name="destinationCountryCode"
                                    className="form-control"
                                    id="destinationCountryCode"/>
                                { errors.destinationCountryCode && touched.destinationCountryCode }
                                <ErrorMessage
                                    component="div"
                                    name="destinationCountryCode"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bagId">Bag ID</label>
                                <Field
                                    readOnly
                                    name="bagId"
                                    className="form-control"
                                    id="bagId"/>
                            </div>
                            <button className="btn btn-danger btn-lg" type="submit">Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}