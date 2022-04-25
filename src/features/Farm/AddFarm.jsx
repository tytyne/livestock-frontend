import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import classNames from "classnames";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { farmCreated } from "./farmSlice";

const AddFarm = () => {
    const dispatch = useDispatch();
    const { farmers } = useSelector((state) => state.farmers);
    console.log(farmers);
    const formik = useFormik({
        initialValues: {
            name: "",
            farmerId: "",
            province: "",
            district: "",
            sector: "",
            village: "",
            cell: "",
            others: "",
        },
        onSubmit: async (data) => {
            console.log(data);
            dispatch(farmCreated(data));
        },
    });
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <form onSubmit={formik.onSubmit}>
                        <h5>Add Farm Form</h5>
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="farm_name">Farm Name</label>
                                <InputText id="farm_name" type="text" value={formik.values.name} placeholder="Name" onChange={formik.handleChange} name="farm_name" autoFocus className={classNames({ "p-invalid": isFormFieldValid("farm_name") })} />
                            </div>
                            <div className="p-field p-col-12 p-md-3">
                                <label htmlFor="Province">Farmers</label>
                                <Dropdown id="province" value={formik.values.province} options={Provinces()} onChange={formik.handleChange} name="province" placeholder="Select a Province" className={classNames({ "p-invalid": isFormFieldValid("province") })} />
                                <span className={classNames({ "p-error": isFormFieldValid("province") })}>{getFormErrorMessage("province")}</span>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFarm;
