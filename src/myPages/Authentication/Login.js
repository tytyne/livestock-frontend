import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";

export const Login = () => {
    return (
        <>
            <div className="p-grid" style={{ backgroundColor: "white" }}>
                <div className="p-col" style={{ backgroundColor: "blue" }}>
                    {" "}
                    1
                </div>
                <div className="p-col-6">
                    <div className="p-col-10">
                        <center>
                            <h4>Welcome Back</h4>
                        </center>

                        <div className="card">
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="email">Email</label>
                                    <InputText id="email" type="email" placeholder="Email address" />
                                </div>
                                <div className="p-field p-col-12 p-md-12">
                                    <label htmlFor="password">password</label>
                                    <InputText id="password" type="password" placeholder="Password" />
                                </div>

                                <div className="p-field p-col-12 p-md-12">
                                <Button label="Login"></Button>
                                <center><h6>Don't Have an account? <span>Signup</span></h6></center>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
