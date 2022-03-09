import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            earring_num: "",
            nid: "",
            animal_cat: "",
            birthdate: "",
            birthkgs: "",
            parent: "option",
            expected_exit: "",
            expected_exit_kgs: "34",
            farmerId: "",
        },
        onSubmit: async (data) => {
            console.log(data);
            dispatch(createAnimal(data));
            // formik.resetForm();
        },
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div className="p-grid">
            {/* fullname: DataTypes.STRING,
    phone: DataTypes.STRING,

 
    farmer_cat:DataTypes.STRING,
    bank_acc: DataTypes.STRING,
     */}

            <div className="p-col-12">
                <div className="card">
                    <form onSubmit={formik.handleSubmit}>
                        <h5>Add animal Form</h5>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="firstname2">Earring Number</label>
                                <InputText id="firstname2" type="text" value={formik.values.earring_num} onChange={formik.handleChange} name="earring_num" autoFocus className={classNames({ "p-invalid": isFormFieldValid("earring_num") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="lastname2">NID</label>
                                <InputText id="lastname2" type="text" value={formik.values.nid} onChange={formik.handleChange} name="nid" autoFocus className={classNames({ "p-invalid": isFormFieldValid("nid") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="phone">Animal Category</label>
                                <InputText id="phone" type="text" value={formik.values.animal_cat} onChange={formik.handleChange} name="animal_cat" autoFocus className={classNames({ "p-invalid": isFormFieldValid("animal_cat") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="birthdate">Birthdate</label>
                                <Calendar showIcon showButtonBar name="birthdate" value={formik.values.birthdate} onChange={formik.handleChange}></Calendar>
                            </div>
                            {/* farmerId: DataTypes.STRING,
                
								birthkgs: DataTypes.STRING,
                    parent:DataTypes.STRING,
                    expected_exit: DataTypes.DATE,
                    expected_exit_kgs:DataTypes.STRING,
                    unexpected_exit: DataTypes.DATE,
                    unexpected_cause:DataTypes.STRING,
                    createdBy:DataTypes.INTEGER,
                    status:{
                    type:DataTypes.ENUM('active','unactive'),
                    defaultValue:'active'
									}, */}
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="nid">Birthdate Kgs</label>

                                <InputText id="nid" type="text" value={formik.values.birthkgs} onChange={formik.handleChange} name="birthkgs" autoFocus className={classNames({ "p-invalid": isFormFieldValid("birthkgs") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="farmerid">Farmer Id</label>
                                <InputText id="farmerId" type="text" value={formik.values.farmerId} onChange={formik.handleChange} name="farmerId" autoFocus className={classNames({ "p-invalid": isFormFieldValid("farmerId") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="state">Parent Animal ID</label>
                                {/* <Dropdown id="state" value={formik.values.parent} onChange={formik.handleChange} options={dropdownItems} placeholder="Select One"></Dropdown> */}
                            </div>
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="state">Expected Exit</label>
                                {/* <h5>Calendar</h5> */}
                                <Calendar showIcon showButtonBar name="expected_exit" onChange={formik.handleChange}></Calendar>
                            </div>
                            {/* <h5>Calendar</h5>
                    <Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar> */}
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="state">Expected Exit Kgs</label>
                                {/* <Dropdown id="state" name="expectedExitkgs" onChange={formik.handleChange} optionLabel="name" options={dropdownItems} placeholder="Select One"></Dropdown> */}
                            </div>
                            {/* 
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Sector</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div> */}
                            {/* <div className="card">
                            <h5>Gender</h5>
                            <div className="p-grid">
                                <div className="p-col-12 p-md-4">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="option1" name="option" value="male" checked={radioValue === "male"} onChange={(e) => setRadioValue(e.value)} />
                                        <label htmlFor="option1">male</label>
                                    </div>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="option2" name="option" value="female" checked={radioValue === "female"} onChange={(e) => setRadioValue(e.value)} />
                                        <label htmlFor="option2">female</label>
                                    </div>
                                </div>
                                <div className="p-col-12 p-md-4">
                                    <div className="p-field-radiobutton">
                                        <RadioButton inputId="option3" name="option" value="others" checked={radioValue === "others"} onChange={(e) => setRadioValue(e.value)} />
                                        <label htmlFor="option3">others</label>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="state">Farmer Category</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="phone">Bank Account</label>
                            <InputText id="phone" type="text" />
                        </div> */}
                            {/* <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="state">Sector</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div> */}
                            <Button type="submit" label="Submit"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
