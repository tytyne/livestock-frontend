import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { ProgressSpinner } from 'primereact/progressspinner';

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../actions/auth";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
export const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
  
    const dispatch = useDispatch();
  
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(login(email, password))
          .then(() => {
            props.history.push("/");
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
  
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
  
    return (
        <>
            <div className="p-grid" style={{ backgroundColor: "white" }}>
                <div className="p-col" style={{ backgroundColor: "#448dee",height:"100vh" }}>
                    {" "}
                    1
                </div>
                <div className="p-col-6">
                    <div className="p-col-10">
                        <center>
                            <h4 style={{marginTop:"40px",marginBottom:"20px" }}>Welcome Back</h4>
                        </center>

                        <div className="card">
                        <Form onSubmit={handleLogin} ref={form}>
                            <div className="p-fluid p-formgrid p-grid">
                           
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="email">Email</label>
                                    <InputText id="email" type="email" name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required]} placeholder="Email address" />
                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="password">password</label>
                                    <InputText id="password" type="password" name="username"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]} placeholder="Password" />
                                </div>

                                {/* <div className="p-field p-col-12 p-md-12">
                                <Button label="Login"></Button>
                                <center><h6>Don't Have an account? <span>Signup</span></h6></center>
                                </div> */}
                              
                                <div className="p-field p-col-12 p-md-12" disabled={loading}>
                                {loading && (
                                    // <span className="spinner-border spinner-border-sm"></span>
                                    <ProgressSpinner/>
                                )}
                                 <Button label="Login" style={{top: "20px" }} ></Button>
                                {/* <span>Login</span> */}
                                <div style={{marginTop:"40px" }}>
                                <center><h6>Don't Have an account? <span>Signup</span></h6></center>
                                </div>
                                
                                
                               

                            {message && (
                                <div className="form-group">
                                <div className="alert alert-danger" style={{background: "pink"}} role="alert">
                                    {message}
                                </div>
                                </div>
                            )}
                             </div>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            
                            </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
