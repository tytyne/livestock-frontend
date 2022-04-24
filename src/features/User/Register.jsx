import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import AuthShell from "../../AuthShell";
import { useHistory } from "react-router-dom";
import { userSelector, reset, signupUser } from "./UserSlice";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const Register = () => {
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [successful, setSuccessful] = useState(false);
    // const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };
    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeOccupation = (e) => {
        const occupation = e.target.value;
        setOccupation(occupation);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(signupUser(firstname, lastname, username, email, password, occupation))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };
    useEffect(() => {
        if (isError) {
            // toast.error(errorMessage);
            dispatch(reset());
        }
        if (isSuccess) {
            dispatch(reset());
            history.push("/");
        }
    }, [isError, isSuccess]);
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

                            <Form onSubmit={handleRegister} ref={form}>
                                {!successful && (
                                    <div className="card">
                                        <div className="p-fluid p-formgrid p-grid">
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="firstname">Firstname</label>
                                                <InputText id="firstname" type="text" name="firstname" value={firstname} onChange={onChangeFirstname} validations={[required]} placeholder="FirstName" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="lastname">Lastname</label>
                                                <InputText id="lastname" type="text" name="lastname" value={lastname} onChange={onChangeLastname} validations={[required]} placeholder="LastName" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="username">Username</label>
                                                <InputText id="username" type="input" name="username" value={username} onChange={onChangeUsername} validations={[required]} placeholder="Username" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="email">Email</label>
                                                <InputText id="email" type="email" name="email" value={email} onChange={onChangeEmail} validations={[required]} placeholder="Email address" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="password">password</label>
                                                <InputText id="password" type="password" name="password" value={password} onChange={onChangePassword} validations={[required]} placeholder="Password" />
                                            </div>

                                            <div className="p-field p-col-12 p-md-12">
                                                <label htmlFor="occupation">Occupation</label>
                                                <InputText id="occupation" type="text" name="occupation" value={occupation} onChange={onChangeOccupation} validations={[required]} placeholder="Occupation" />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12">
                                                <Button label="Submit"></Button>
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
