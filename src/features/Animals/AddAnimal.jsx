import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from "primereact/calendar";
import { createAnimal } from "./animalSlice";
export const AddAnimal = () => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = ["Option 1", "Option 2", "Option 3"];
    const [radioValue, setRadioValue] = useState(null);
    const [calendarValue, setCalendarValue] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const { farm } = useSelector((state) => state);
    const farmIds = farm.farms.data;
    const dispatch = useDispatch();
    const newFarming = () => {
        setSubmitted(false);
    };
    const animalSchema = Yup.object().shape({
        earring_num: Yup.number().min(3).required("earing number must 3 digit"),
        animal_cat: Yup.string().min(3).required("animal must 3 characters"),
        birthdate: Yup.date().required("birthdate must be"),
        birthkgs: Yup.string().max(3).required("birthkgs must be"),
        parent: Yup.string().required("Parent is required"),
        expected_exit: Yup.date().required("expected exit required"),
        expected_exit_kgs: Yup.string().max(3).required("expected exit required"),
        farmId: Yup.string().required("farm id required"),
    });
    const formik = useFormik({
        initialValues: {
            earring_num: "",
            animal_cat: "",
            birthdate: "",
            birthkgs: "",
            parent: "132",
            expected_exit: "",
            expected_exit_kgs: "",
            farmId: "",
        },
        validationSchema: animalSchema,
        onSubmit: async (data) => {
            console.log(data);
            dispatch(createAnimal(data));
            setSubmitted(true);
            formik.resetForm();
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
                            <h5>Add animal Form</h5>

                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="firstname2">Earring Number</label>
                                    <InputText id="firstname2" type="text" value={formik.values.earring_num} onChange={formik.handleChange} name="earring_num" autoFocus className={classNames({ "p-invalid": isFormFieldValid("earring_num") })} />
                                </div>

                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="animal_cat">Animal Category</label>
                                    <InputText id="animal_cat" type="text" value={formik.values.animal_cat} onChange={formik.handleChange} name="animal_cat" autoFocus className={classNames({ "p-invalid": isFormFieldValid("animal_cat") })} />
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <Calendar showIcon showButtonBar name="birthdate" value={formik.values.birthdate} onChange={formik.handleChange} className={classNames({ "p-invalid": isFormFieldValid("birthdate") })} />
                                </div>

                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="birthkgs">Birthdate Kgs</label>

                                    <InputText id="birthkgs" type="text" value={formik.values.birthkgs} onChange={formik.handleChange} name="birthkgs" autoFocus className={classNames({ "p-invalid": isFormFieldValid("birthkgs") })} />
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="farmId">Farm Id</label>
                                    <select placeholder="select farm" className="form-select" id="inputGroupSelect01" name="farmId" tabIndex="-1" aria-hidden="true" value={formik.values.farmId} onChange={formik.handleChange}>
                                        {/* <option value=""></option> */}
                                        {farmIds.map((_farms) => (
                                            <option key={_farms?.id} value={_farms?.id}>
                                                {_farms.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className={classNames({ "p-error": isFormFieldValid("farmId}") })}>{getFormErrorMessage("farmId}")}</span>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="parent">Parent Animal ID</label>
                                    <Dropdown id="parent" value={formik.values.parent} onChange={formik.handleChange} options={dropdownItems} placeholder="Select One"></Dropdown>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="expectedExit">Expected Exit</label>
                                    <Calendar showIcon showButtonBar name="expected_exit" onChange={formik.handleChange}></Calendar>
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label htmlFor="expectedExit">Expected Exit Kgs</label>
                                    <InputText id="expectedKgs" type="text" value={formik.values.expected_exit_kgs} onChange={formik.handleChange} name="expected_exit_kgs" autoFocus className={classNames({ "p-invalid": isFormFieldValid("farmerId") })} />
                                </div>

                                <Button type="submit" label="Submit"></Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};
