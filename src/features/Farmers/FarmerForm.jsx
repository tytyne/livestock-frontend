import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { createFarmer } from "./farmerSlice";
import { Dropdown } from "primereact/dropdown";

export const FarmerForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [radioValue, setRadioValue] = useState(null);

    const dispatch = useDispatch();

    const newFarming = () => {
        setSubmitted(false);
    };
    const farmerSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required"),
        lastname: Yup.string().required("Lastname is required"),
        phone: Yup.string().max(10).required("Phone is required"),
        nid: Yup.string().max(16).required("Nid is required"),
        gender: Yup.string().required("Gender is required"),
        farmer_cat: Yup.string().required("FarmerCat is required"),
        province: Yup.string().required("Province is required"),
        district: Yup.string().required("District is required"),
        cell: Yup.string().required("Cell is required"),
        sector: Yup.string().required("Sector is required"),
        village: Yup.string().required("Village is required"),
    });
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            phone: "",
            nid: "",
            gender: "",
            farmer_cat: "A",
            province: "",
            district: "",
            cell: "",
            sector: "",
            village: "",
        },
        validationSchema: farmerSchema,
        onSubmit: async (data) => {
            dispatch(createFarmer(data)).unwrap();
            setSubmitted(true);
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div className="p-grid">
            <div className="p-col-12">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newFarming}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="card">
                        <form onSubmit={formik.handleSubmit}>
                            <h5>Farmer Form</h5>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-6">
                                    <label htmlFor="firstname">Firstname</label>
                                    <InputText id="firstname" type="text" value={formik.values.firstname} onChange={formik.handleChange} name="firstname" autoFocus className={classNames({ "p-invalid": isFormFieldValid("firstname") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("firstname") })}>{getFormErrorMessage("firstname")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-6">
                                    <label htmlFor="lastname2">Lastname</label>
                                    <InputText id="lastname" type="text" value={formik.values.lastname} onChange={formik.handleChange} name="lastname" className={classNames({ "p-invalid": isFormFieldValid("lastname") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("firstname") })}>{getFormErrorMessage("lastname")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-6">
                                    <label htmlFor="phone">Phone Number</label>
                                    <InputText id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("phone") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("phone") })}>{getFormErrorMessage("phone")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-6">
                                    <label htmlFor="nid">ID</label>
                                    <InputText id="nid" name="nid" value={formik.values.nid} onChange={formik.handleChange} mode="decimal" className={classNames({ "p-invalid": isFormFieldValid("nide") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("nid") })}>{getFormErrorMessage("nid")}</span>
                                </div>

                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="Province">Provinces</label>
                                    <Dropdown id="province" value={formik.values.province} options={Provinces()} onChange={formik.handleChange} name="province" placeholder="Select a Province" className={classNames({ "p-invalid": isFormFieldValid("province") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("province") })}>{getFormErrorMessage("province")}</span>
                                </div>

                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="District">Districts</label>
                                    <Dropdown id="Districts" value={formik.values.district} options={Districts(formik.values.province)} onChange={formik.handleChange} name="district" placeholder="Select a District" className={classNames({ "p-invalid": isFormFieldValid("district") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("district") })}>{getFormErrorMessage("district")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="Sectors">Sectors</label>

                                    <Dropdown id="sector" value={formik.values.sector} options={Sectors(formik.values.province, formik.values.district)} onChange={formik.handleChange} name="sector" placeholder="Select a Sector" className={classNames({ "p-invalid": isFormFieldValid("sector") })} />
                                    <span className={classNames({ "p-error": isFormFieldValid("sector") })}>{getFormErrorMessage("sector")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="Cells">Cells</label>

                                    <Dropdown
                                        id="cell"
                                        value={formik.values.cell}
                                        options={Cells(formik.values.province, formik.values.district, formik.values.sector)}
                                        onChange={formik.handleChange}
                                        name="cell"
                                        placeholder="Select a Cell"
                                        className={classNames({ "p-invalid": isFormFieldValid("cell") })}
                                    />
                                    <span className={classNames({ "p-error": isFormFieldValid("cell") })}>{getFormErrorMessage("cell")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="Villages">Villages</label>
                                    <Dropdown
                                        id="village"
                                        value={formik.values.village}
                                        options={Villages(formik.values.province, formik.values.district, formik.values.sector, formik.values.cell)}
                                        onChange={formik.handleChange}
                                        name="village"
                                        placeholder="Select a Village"
                                        className={classNames({ "p-invalid": isFormFieldValid("village") })}
                                    />
                                    <span className={classNames({ "p-error": isFormFieldValid("village") })}>{getFormErrorMessage("village")}</span>
                                </div>

                                <div className="card">
                                    <h5>Gender</h5>
                                    <div className="p-grid">
                                        <div className="p-col-12 p-md-4">
                                            <div className="p-field-radiobutton">
                                                <RadioButton inputId="option1" name="gender" value="male" checked={radioValue === "male"} onChange={formik.handleChange} />
                                                <label htmlFor="option1">male</label>
                                            </div>
                                        </div>
                                        <div className="p-col-12 p-md-4">
                                            <div className="p-field-radiobutton">
                                                <RadioButton inputId="option2" name="gender" value="female" checked={radioValue === "female"} onChange={formik.handleChange} />
                                                <label htmlFor="option2">female</label>
                                            </div>
                                        </div>
                                        <div className="p-col-12 p-md-4">
                                            <div className="p-field-radiobutton">
                                                <RadioButton inputId="option3" name="gender" value="others" checked={radioValue === "others"} onChange={formik.handleChange} />
                                                <label htmlFor="option3">others</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="farmer_cat">Farmer Category</label>
                                    {/* <Dropdown id="farmer_cat" value={dropdown} onChange={(e) => setDropdown(e.value)} options={dropdowns} optionLabel="name" placeholder="Select One"></Dropdown> */}
                                </div>
                                <div className="p-field p-col-12 p-md-4">
                                    <label htmlFor="phone">Bank Account</label>
                                    <InputText id="phone" type="text" />
                                </div>
                                <Button type="submit" label="Submit"></Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {/* {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )} */}
        </div>
    );
};
