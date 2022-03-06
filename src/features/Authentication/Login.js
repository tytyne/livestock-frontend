import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import AuthShell from "../../AuthShell";
import classNames from "classnames";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

export const Login = (props) => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const dispatch = useDispatch();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("invalid email").required("is required"),
        password: Yup.string().required("is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (formValue) => {
            // const canLogin = [formik.email, formik.password].every(Boolean) && addRequestStatus === "idle";
            // console.log("Please", [formik.email, formik.password].every(Boolean) && canLogin);
            const { username, password } = formValue;
            setLoading(true);
            dispatch(login({ username, password }))
                .unwrap()
                .then(() => {
                    props.history.push("/");
                    window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
            // try {
            //     setAddRequestStatus("pending");
            //     dispatch(loginUser(data)).unwrap();
            // } catch (error) {
            //     console.error("Failed to save the post: ", error.response);
            // } finally {
            //     setAddRequestStatus("idle");
            // }
            // formik.resetForm();
        },
    });
    // function login(data) {
    // }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = (
        <div className="text-center">
            <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
        </div>
    );

    return (
        <>
            <AuthShell>
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ "960px": "80vw" }} style={{ width: "30vw" }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
                        <div className="text-900 font-bold text-xl mt-5">Registration Successful!</div>
                        <p className="line-height-3 my-4">
                            Your account is registered under name <b>{formData.email}</b>. It'll be valid for 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                        </p>
                    </div>
                </Dialog>

                <div className="p-grid" style={{ backgroundColor: "white" }}>
                    <div className="p-col" style={{ backgroundColor: "#448dee", height: "100vh" }}></div>
                    <div className="p-col-6">
                        <div className="p-col-10">
                            <center>
                                <h4 style={{ marginTop: "40px", marginBottom: "20px" }}>Welcome Back</h4>
                            </center>

                            <div className="card">
                                <form onSubmit={formik.handleSubmit} className="p-fluid">
                                    <div className="p-fluid p-formgrid p-grid">
                                        <div className="p-field p-col-12 p-md-12">
                                            <label htmlFor="email" className={classNames({ "p-error": isFormFieldValid("email") })}>
                                                Email*
                                            </label>
                                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("email") })} />
                                            <span>{getFormErrorMessage("email")}</span>
                                        </div>

                                        <div className="p-field p-col-12 p-md-12">
                                            <label htmlFor="password" className={classNames({ "p-error": isFormFieldValid("password") })}>
                                                Password*
                                            </label>
                                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask className={classNames({ "p-invalid": isFormFieldValid("password") })} />
                                            <span>{getFormErrorMessage("password")}</span>
                                        </div>
                                    </div>

                                    <Button type="submit" label="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </AuthShell>
        </>
    );
};
