import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { getFarmers, removeFarmer, farmerUpdated } from "./farmerSlice";

export const AllFarmers = () => {
    let emptyFarmer = {
        id: "",
        firstname: "",
        lastname: "",
        phone: "",
        gender: 0,
        district: 0,
        status: "active",
    };

    //my own codes
    const [farmers, setFarmers] = useState(null);
    const [farmerDialog, setFarmerDialog] = useState(false);
    const [deleteFarmerDialog, setDeleteFarmerDialog] = useState(false);
    const [deleteFarmersDialog, setDeleteFarmersDialog] = useState(false);
    const [farmer, setFarmer] = useState(emptyFarmer);
    const [selectedFarmers, setSelectedFarmers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const farming = useSelector((state) => state.farmer);
    const dispatch = useDispatch();
    // const { farmer: f, isLoading, isError, message } = useSelector((state) => state.farmer);

    //my codes
    useEffect(() => {
        setFarmers(dispatch(getFarmers()));
    }, [farmer]);

    //my own codes
    const openNew = () => {
        setFarmer(emptyFarmer);
        setSubmitted(false);
        setFarmerDialog(true);
    };
    // my own codes

    const hideDialog = () => {
        setSubmitted(false);
        setFarmerDialog(false);
    };

    //my own codes
    const hideDeleteFarmerDialog = () => {
        setDeleteFarmerDialog(false);
    };

    //my own codes

    const hideDeleteFarmersDialog = () => {
        setDeleteFarmersDialog(false);
    };
    const updateFarmer = () => {
        setSubmitted(true);
        console.log(farmer);
        if (farmer) {
            let _farmer = { ...farmer };
            if (farmer.id) {
                const index = findIndexById(farmer.id);
                setFarmers(dispatch(farmerUpdated(_farmer)));
                setFarmerDialog(false);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Farmer Updated", life: 3000 });
                setFarmer(emptyFarmer);
                // window.reload();
            }
        }
        // if (farmer.firstname.trim()) {
        //     let _farmers = [...farmers];
        //     let _farmer = { ...farmer };
        //     if (farmer.id) {
        //         const index = findIndexById(farmer.id);

        //         _farmer[index] = _farmer;
        //         toast.current.show({ severity: "success", summary: "Successful", detail: "Farmer Updated", life: 3000 });
        //     } else {
        //         _farmer.id = createId();
        //         _farmers.push(_farmer);
        //         toast.current.show({ severity: "success", summary: "Successful", detail: "Farmer Created", life: 3000 });
        //     }

        //     setFarmers(dispatch(updateFarmer(_farmers).unwrap()));
        //     setFarmerDialog(false);
        //     setFarmer(emptyFarmer);
        // }
    };

    const editFarmer = (farmer) => {
        setFarmer({ ...farmer });
        setFarmerDialog(true);
    };

    const confirmDeleteFarmer = (farmer) => {
        setFarmer(farmer);
        setDeleteFarmerDialog(true);
    };

    const deleteFarmer = () => {
        // let _farmers = await
        // console.log(farmer.id);
        // dispatch(removeFarmer(farmer.id));
        // dispatch(removeFarmer(farmer.id)).unwrap();
        setFarmers(dispatch(removeFarmer(farmer.id)).unwrap());
        setDeleteFarmerDialog(false);
        setFarmer(emptyFarmer);
        toast.current.show({ severity: "success", summary: "Successful", detail: "farmer Deleted", life: 3000 });
        window.reload();
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < farmers.length; i++) {
            if (farmers[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteFarmersDialog(true);
    };

    const deleteSelectedFarmers = () => {
        let _farmers = farmers.filter((val) => !selectedFarmers.includes(val));
        setFarmers(_farmers);
        setDeleteFarmersDialog(false);
        setSelectedFarmers(null);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Farmers Deleted", life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _farmer = { ...farmer };
        _farmer["category"] = e.value;
        setFarmer(_farmer);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _farmer = { ...farmer };
        _farmer[`${name}`] = val;

        setFarmer(_farmer);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _farmer = { ...farmer };
        _farmer[`${name}`] = val;

        setFarmer(_farmer);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedFarmers || !selectedFarmers.length} />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const firstnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Firstname</span>
                {rowData.firstname}
            </>
        );
    };

    const lastnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Lastname</span>
                {rowData.lastname}
            </>
        );
    };
    const phoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Phone</span>
                {rowData.phone}
            </>
        );
    };

    const genderBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Gender</span>
                {rowData.gender}
            </>
        );
    };
    const districtBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Distict</span>
                {rowData.district}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editFarmer(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteFarmer(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Farmers</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const farmerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={updateFarmer} />
        </>
    );
    const deleteFarmerDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFarmerDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteFarmer} />
        </>
    );
    const deleteFarmersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFarmersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedFarmers} />
        </>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={farming.farmers.data}
                        selection={selectedFarmers}
                        onSelectionChange={(e) => setSelectedFarmers(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} farmers"
                        globalFilter={globalFilter}
                        emptyMessage="No farmers found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
                        <Column field="firstname" header="Firstname" sortable body={firstnameBodyTemplate}></Column>
                        <Column field="lastname" header="Lastname" sortable body={lastnameBodyTemplate}></Column>
                        <Column field="phone" header="Phone" sortable body={phoneBodyTemplate}></Column>
                        <Column field="gender" header="Gender" sortable body={genderBodyTemplate}></Column>
                        <Column field="district" header="District" sortable body={districtBodyTemplate}></Column>
                        {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    {/* Updating Farmer dialog box  */}
                    <Dialog visible={farmerDialog} style={{ width: "450px" }} header="Farmer Details" modal className="p-fluid" footer={farmerDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="firstname">FirstName</label>
                            <InputText id="firstname" value={farmer.firstname} onChange={(e) => onInputChange(e, "firstname")} required autoFocus className={classNames({ "p-invalid": submitted && !farmer.firstname })} />
                            {submitted && !farmer.firstname && <small className="p-invalid">FirstName is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">LastName</label>
                            <InputText id="lastname" value={farmer.lastname} onChange={(e) => onInputChange(e, "lastname")} required rows={3} cols={20} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">Phone</label>
                            <InputText id="lastname" value={farmer.phone} onChange={(e) => onInputChange(e, "phone")} required rows={3} cols={20} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">District</label>
                            <InputText id="lastname" value={farmer.district} onChange={(e) => onInputChange(e, "district")} required rows={3} cols={20} />
                        </div>
                    </Dialog>
                    {/* Deleting Farmer confirmation Dialog */}
                    <Dialog visible={deleteFarmerDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteFarmerDialogFooter} onHide={hideDeleteFarmerDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {farmer && (
                                <span>
                                    Are you sure you want to delete <b>{farmer.nid}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteFarmersDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteFarmersDialogFooter} onHide={hideDeleteFarmersDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {farmer && <span>Are you sure you want to delete the selected farmers?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
