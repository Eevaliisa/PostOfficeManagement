import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from "reactstrap";

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
            bagId: new URLSearchParams(window.location.search).get("id"),
            showSuccess: false,
            showError: false,
        };
    }

    handleBackButton = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        return (
            <div className="add-form">
                <h2 className="list-title">
                    <Button className="btn btn-secondary float-left" onClick={ this.handleBackButton }>
                        Back
                    </Button>
                    Add new parcel to bag no { this.state.bagId }</h2>
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
                        fetch("http://localhost:5000/api/parcel", {
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

                            { this.state.showSuccess &&
                            resetForm &&
                            setTimeout(() => this.setState({ showSuccess: false }),5000) &&
                            <div className="alert alert-success" >
                                New parcel successfully added!
                            </div> }
                            { this.state.showError &&
                            setTimeout(() => this.setState({ showError: false }),5000) &&
                            <div className="alert alert-danger">
                                Parcel with given ID already exists! Please choose new value for ID.
                            </div>}
                            
                            <button className="btn btn-success btn-lg" type="submit" 
                                    disabled={ isSubmitting || this.state.bagId === null}>
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