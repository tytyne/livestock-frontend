import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import AuthShell from "../../AuthShell";
import { useHistory } from "react-router-dom";
import { userSelector, reset, signupUser } from "./UserSlice";

const Register = () => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();
    const [successful, setSuccessful] = useState(false);
    // const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);

    const registerFormSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required"),
        lastname: Yup.string().required("Lastname is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        occupation: Yup.string().required("Occupation is required"),
    });

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            username: "",
            occupation: "",
            password: "",
            email: "",
        },
        validationSchema: registerFormSchema,
        onSubmit: async (data) => {
            try {
                console.log(data);
                dispatch(signupUser(data));
                setSuccessful(true);
            } catch (error) {
                setSuccessful(false);
            }
        },
    });
    return (
        <>
            <AuthShell>
                <div className="p-grid" style={{ backgroundColor: "white" }}>
                    <div className="p-col" style={{ backgroundColor: "#448dee" }}></div>
                    <div className="p-col-6">
                        <div className="p-col-10">
                            <center>
                                <h4>Create Account</h4>
                            </center>

                            <Form onSubmit={formik.handleSubmit}>
                                {!successful && (
                                    <div className="card">
                                        <div className="p-fluid p-formgrid p-grid">
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="firstname">Firstname</label>
                                                <InputText id="firstname" type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} placeholder="FirstName" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="lastname">Lastname</label>
                                                <InputText id="lastname" type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} placeholder="LastName" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="username">Username</label>
                                                <InputText id="username" type="input" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Username" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="email">Email</label>
                                                <InputText id="email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email address" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="password">password</label>
                                                <InputText id="password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
                                            </div>

                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="occupation">Occupation</label>
                                                <InputText id="occupation" type="text" name="occupation" value={formik.values.occupation} onChange={formik.handleChange} placeholder="Occupation" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <Button type="submit" label="Submit"></Button>
                                                <center>
                                                    <h6>
                                                        Have an account? <span>Login</span>
                                                    </h6>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {errorMessage && (
                                    <div className="form-group">
                                        <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                            {errorMessage}
                                        </div>
                                    </div>
                                )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                    </div>
                </div>
            </AuthShell>
        </>
    );
};

export default Register;
