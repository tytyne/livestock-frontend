import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
export const AddFArmer = () => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: "Option 1", code: "Option 1" },
        { name: "Option 2", code: "Option 2" },
        { name: "Option 3", code: "Option 3" },
    ];
    const [radioValue, setRadioValue] = useState(null);

    return (
        <div className="p-grid">
            {/* fullname: DataTypes.STRING,
    phone: DataTypes.STRING,

 
    farmer_cat:DataTypes.STRING,
    bank_acc: DataTypes.STRING,
     */}

            <div className="p-col-12">
                <div className="card">
                    <h5>Farmer Form</h5>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname2">Firstname</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="phone">Phone Number</label>
                            <InputText id="phone" type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="nid">ID</label>
                            <InputText id="nid" type="text" />
                        </div>

                        {/* <div className="p-field p-col-12">
                            <label htmlFor="address">Address</label>
                            <InputTextarea id="address" rows="4" />
                        </div> */}

                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Province</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">District</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Cell</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="state">Sector</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="card">
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
                        </div>
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
