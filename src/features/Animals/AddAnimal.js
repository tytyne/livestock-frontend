import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from 'primereact/calendar';
export const AddAnimal = () => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: "Option 1", code: "Option 1" },
        { name: "Option 2", code: "Option 2" },
        { name: "Option 3", code: "Option 3" },
    ];
    const [radioValue, setRadioValue] = useState(null);
    const [calendarValue, setCalendarValue] = useState(null);

    return (
        <div className="p-grid">
            {/* fullname: DataTypes.STRING,
    phone: DataTypes.STRING,

 
    farmer_cat:DataTypes.STRING,
    bank_acc: DataTypes.STRING,
     */}

            <div className="p-col-12">
                <div className="card">
                    <h5>Add animal Form</h5>

                  

                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname2">Earring Number</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lastname2">NID</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="phone">Animal Category</label>
                            <InputText id="phone" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="nid">Birthdate</label>
                            <InputText id="nid" type="text" />
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
                            <InputText id="nid" type="text" />
                        </div>


                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Parent Animal ID</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Expected Exit</label>
                            {/* <h5>Calendar</h5> */}
                    <Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar>
                        </div>
                        {/* <h5>Calendar</h5>
                    <Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value)}></Calendar> */}
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Expected Exit Kgs</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
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
                        <Button label="Submit"></Button>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};
