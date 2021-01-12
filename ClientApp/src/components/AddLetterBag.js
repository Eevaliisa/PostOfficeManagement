import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import {Link} from "react-router-dom";

const AddLetterBagSchema = Yup.object().shape({

    bagId: Yup.string()
        .matches(/^[0-9a-zA-Z]*$/,
            "Bag Id can contain only letters and numbers. Special characters are not allowed.")
        .max(15, "Bag Id cannot be longer than 15 characters.")
        .required("Bag Id is required"),
    totalWeight: Yup.number()
        .typeError("Please use numbers only.")
        .positive("Total weight must be greater than 0.")
        .required("Weight is required."),
    totalPrice: Yup.number()
        .typeError("Please use numbers only.")
        .positive("Total price must be greater than 0.")
        .required("Price is required."),
    lettersCount: Yup.number()
        .typeError("Please use numbers only.")
        .positive("Total number of letters must be greater than 0.")
        .required("Number of letters is required."),
    destinationCountryCode: Yup.string()
        .matches(/^[a-zA-Z]{2}$/,
            "Incorrect format! Please use two letters format e.g EE")
        .required("Destination country code is required.")
});

export class AddLetterBag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shipmentId: new URLSearchParams(window.location.search).get('id')
        };
    }

    render() {
        return (
            <div className="add-form">
                <h2 className="list-title">
                    <Link to="/" className="btn btn-secondary float-left">Back</Link>
                    Add new bag of letters to shipment no {this.state.shipmentId}</h2>

                <Formik
                    initialValues={{
                        bagId: "",
                        totalWeight: "",
                        totalPrice: "",
                        lettersCount: "",
                        destinationCountryCode: "",
                        shipmentId: this.state.shipmentId }}
                    validationSchema={AddLetterBagSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        fetch('http://localhost:5000/api/letterbag', {
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
                                <label htmlFor="bagId">Bag ID</label>
                                <Field name="bagId"
                                       className="form-control"/>
                                { errors.bagId && touched.bagId }
                                <ErrorMessage
                                    component="div"
                                    name="bagId"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalWeight">Total Weight</label>
                                <Field
                                    type="text"
                                    name="totalWeight"
                                    className="form-control"
                                    id="totalWeight"/>
                                { errors.totalWeight && touched.totalWeight }
                                <ErrorMessage
                                    component="div"
                                    name="totalWeight"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="totalPrice">Total Price</label>
                                <Field
                                    type="text"
                                    name="totalPrice"
                                    className="form-control"
                                    id="totalPrice"/>
                                { errors.totalPrice && touched.totalPrice }
                                <ErrorMessage
                                    component="div"
                                    name="totalPrice"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lettersCount">Total Number of Letters</label>
                                <Field
                                    type="text"
                                    name="lettersCount"
                                    className="form-control"
                                    id="lettersCount"/>
                                { errors.lettersCount && touched.lettersCount }
                                <ErrorMessage
                                    component="div"
                                    name="lettersCount"
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
                                <label htmlFor="shipmentId">Shipment ID</label>
                                <Field
                                    readOnly
                                    name="shipmentId"
                                    className="form-control"
                                    id="shipmentId"/>
                            </div>
                            <button className="btn btn-success btn-lg" type="submit">Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}