import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from "reactstrap";

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
            shipmentId: new URLSearchParams(window.location.search).get("id"),
            showSuccess: false,
            showError: false
        };
    }
    
    handleBackButtonClick = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        return (
            <div className="add-form">
                <h2 className="list-title">
                    <Button className="btn btn-secondary float-left" onClick={ this.handleBackButtonClick }>
                        Back
                    </Button>
                    Add new bag of letters to shipment no { this.state.shipmentId }</h2>

                <Formik
                    initialValues={{
                        bagId: "",
                        totalWeight: "",
                        totalPrice: "",
                        lettersCount: "",
                        destinationCountryCode: "",
                        shipmentId: this.state.shipmentId }}
                    validationSchema={ AddLetterBagSchema }
                    onSubmit={(values, { setSubmitting }) => {
                        fetch("http://localhost:5000/api/letterbag", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(values)
                        }).then((response) => {
                            if (response.status === 200) {
                                this.setState({ showSuccess: true });
                            }
                            if (response.status === 409) {
                                this.setState( { showError: true });
                            }
                             console.log(response);
                        });

                        setSubmitting(false);
                    }}
                >
                        {({ errors, 
                          touched, 
                          isSubmitting, 
                          resetForm }) => (
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

                            { this.state.showSuccess &&
                            resetForm &&
                            setTimeout(() => this.setState({ showSuccess: false }),5000) &&
                            <div className="alert alert-success" >
                                New bag successfully added!
                            </div> }
                            { this.state.showError &&
                            setTimeout(() => this.setState({ showError: false }),5000) &&
                            <div className="alert alert-danger">
                                Bag with given ID already exists! Please choose new value for ID.
                            </div>}
                            
                            <button className="btn btn-success btn-lg" type="submit" disabled={ isSubmitting }>
                                Save
                            </button>
                            <button className="btn btn-secondary float-right" type="reset" onClick={ resetForm }>
                                Reset
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}