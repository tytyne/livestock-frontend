import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import AuthShell from "../../AuthShell";
import classNames from "classnames";
import { login, reset } from "./UserSlice";

export const Login = () => {
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

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
        onSubmit: async (data) => {
            dispatch(login(data));
        },
    });

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            history.push("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, history, dispatch]);

    if (isLoading) {
        return "loading ...";
        // <Spinner />;
    }
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
                            Your account is registered under name <b>{formik.email}</b>. It'll be valid for 30 days without activation. Please check <b>{formik.email}</b> for activation instructions.
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

                                    <Link to="/forgot-password">Forgot Password?</Link>
                                    <Button type="submit" label="Submit" />

                                    <div class="grid">
                                        <div class="col-4 md:col-4 lg:col-2">A</div>

                                        <div class="col-4 md:col-4 lg:col-2">
                                            <Link to="/register">Register</Link>
                                        </div>
                                    </div>
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
