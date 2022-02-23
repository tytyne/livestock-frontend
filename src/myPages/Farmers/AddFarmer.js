import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { useDispatch } from "react-redux";
import { createFarming } from "../../actions/farming";
// import{Provinces, Districts, Sectors, Cells, Villages} from "rwanda"
const { Provinces, Districts, Sectors, Cells, Villages } = require("rwanda");

// console.log("check provinces",Provinces());
// console.log(Districts("kigali"));

export const AddFArmer = () => {
    const initialFarmingState = {
        firstname: " ",
        lastname: " ",
        phone: " ",
        nid: " ",
        gender: " ",
        farmer_cat: "A",
        province: " ",
        district: " ",
        cell: " ",
        sector: " ",
        village: " ",
    };
    const [farming, setFarming] = useState(initialFarmingState);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [dropdownItem, setDropdownItem] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const dropdownItems = [
        { name: "East", code: "East" },
        { name: "Kigali", code: "Kigali" },
        { name: "North", code: "North" },
        { name: "South", code: "South" },
        { name: "West", code: "West" },
    ];
    const [radioValue, setRadioValue] = useState(null);
    const [provinceItem,setProvinceItem]=useState()
    
    const dispatch = useDispatch();

    const handleInputChange = event => {
      const { name, value } = event.target;
      setFarming({ ...farming, [name]: value });
    };
    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }

    const saveFarming = () => {
        const { firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village } = farming;
    
        dispatch(createFarming(firstname,lastname,phone,nid,gender,farmer_cat,province,district,cell,sector,village))
          .then(data => {
            setFarming({
              id: data.id,
              firstname:data.firstname,
              lastname: data.lastname,
              phone: data.phone,
              nid: data.nid,
              gender: data.gender,
              farmer_cat: data.farmer_cat,
              province: data.province,
              district: data.district,
              cell: data.cell,
              sector: data.sector,
              village: data.village
            });
            setSubmitted(true);
    
            // console.log(data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      const newFarming = () => {
        setFarming(initialFarmingState);
        setSubmitted(false);
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
                    <h5>Farmer Form</h5>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname">Firstname</label>
                            <InputText id="firstname" type="text"  value={farming.firstname}
                            onChange={handleInputChange}
                            name="firstname"/>
             
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <InputText id="lastname" type="text"  value={farming.lastname}
                            onChange={handleInputChange}
                            name="lastname"/>
                           
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="phone">Phone Number</label>
                            <InputText id="phone" type="text"  value={farming.phone}
                            onChange={handleInputChange}
                            name="phone"/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="nid">ID</label>
                            <InputText id="nid" type="text"  value={farming.nid}
                            onChange={handleInputChange}
                            name="nid"/>
                        </div>

                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="province">Province</label>
                            {/* <Dropdown id="province" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown> */}
                            <Dropdown id="province" name="province" value={selectedCity1} options={cities} onChange={onCityChange} optionLabel="name" placeholder="Select a City" />
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="district">District</label>
                            <Dropdown id="district" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="cell">Cell</label>
                            <Dropdown id="cell" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="p-field p-col-12 p-md-3">
                            <label htmlFor="sector">Sector</label>
                            <Dropdown id="sector" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
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
                            <label htmlFor="farmer_cat">Farmer Category</label>
                            <Dropdown id="farmer_cat" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="phone">Bank Account</label>
                            <InputText id="phone" type="text" />
                        </div>
                        <Button onClick={saveFarming} label="Submit"></Button>
                    </div>
                   
                </div>
                 )}
            </div>
        </div>
    );
};
