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
import { getFarms, removeFarm, farmUpdate } from "./farmSlice";

export const FarmsTable = () => {
    let emptyFarm = {
        id: "",
        name: "",
        farmId: "",
        province: "",
        district: "",
        cell: "",
        sector: "",
        village: "",
        others: "",
    };

    //my own codes
    const [farms, setFarms] = useState(null);
    const [farmDialog, setFarmDialog] = useState(false);
    const [deleteFarmDialog, setDeleteFarmDialog] = useState(false);
    const [deleteFarmsDialog, setDeleteFarmsDialog] = useState(false);
    const [farm, setFarm] = useState(emptyFarm);
    const [selectedFarms, setSelectedFarms] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const farming = useSelector((state) => state.farm);
    const dispatch = useDispatch();
    // const { farm: f, isLoading, isError, message } = useSelector((state) => state.farm);

    //my codes
    useEffect(() => {
        setFarms(dispatch(getFarms()));
    }, [farm]);

    //my own codes
    const openNew = () => {
        setFarm(emptyFarm);
        setSubmitted(false);
        setFarmDialog(true);
    };
    // my own codes

    const hideDialog = () => {
        setSubmitted(false);
        setFarmDialog(false);
    };

    //my own codes
    const hideDeleteFarmDialog = () => {
        setDeleteFarmDialog(false);
    };

    //my own codes

    const hideDeleteFarmsDialog = () => {
        setDeleteFarmsDialog(false);
    };
    const updateFarm = () => {
        setSubmitted(true);
        console.log(farm);
        if (farm) {
            let _farm = { ...farm };
            if (farm.id) {
                const index = findIndexById(farm.id);
                setFarms(dispatch(farmUpdate(_farm)));
                setFarmDialog(false);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Farm Updated", life: 3000 });
                setFarm(emptyFarm);
                // window.reload();
            }
        }
        // if (farm.firstname.trim()) {
        //     let _farms = [...farms];
        //     let _farm = { ...farm };
        //     if (farm.id) {
        //         const index = findIndexById(farm.id);

        //         _farm[index] = _farm;
        //         toast.current.show({ severity: "success", summary: "Successful", detail: "Farm Updated", life: 3000 });
        //     } else {
        //         _farm.id = createId();
        //         _farms.push(_farm);
        //         toast.current.show({ severity: "success", summary: "Successful", detail: "Farm Created", life: 3000 });
        //     }

        //     setFarms(dispatch(updateFarm(_farms).unwrap()));
        //     setFarmDialog(false);
        //     setFarm(emptyFarm);
        // }
    };

    const editFarm = (farm) => {
        setFarm({ ...farm });
        setFarmDialog(true);
    };

    const confirmDeleteFarm = (farm) => {
        setFarm(farm);
        setDeleteFarmDialog(true);
    };

    const deleteFarm = () => {
        // let _farms = await
        // console.log(farm.id);
        // dispatch(removeFarm(farm.id));
        // dispatch(removeFarm(farm.id)).unwrap();
        setFarms(dispatch(removeFarm(farm.id)).unwrap());
        setDeleteFarmDialog(false);
        setFarm(emptyFarm);
        toast.current.show({ severity: "success", summary: "Successful", detail: "farm Deleted", life: 3000 });
        window.reload();
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < farms.length; i++) {
            if (farms[i].id === id) {
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
        setDeleteFarmsDialog(true);
    };

    const deleteSelectedFarms = () => {
        let _farms = farms.filter((val) => !selectedFarms.includes(val));
        setFarms(_farms);
        setDeleteFarmsDialog(false);
        setSelectedFarms(null);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Farms Deleted", life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _farm = { ...farm };
        _farm["category"] = e.value;
        setFarm(_farm);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _farm = { ...farm };
        _farm[`${name}`] = val;

        setFarm(_farm);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _farm = { ...farm };
        _farm[`${name}`] = val;

        setFarm(_farm);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedFarms || !selectedFarms.length} />
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

    const farmNameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">FarmName</span>
                {/* {console.log(rowData)} */}
                {rowData.name}
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editFarm(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteFarm(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Farms</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const farmDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={updateFarm} />
        </>
    );
    const deleteFarmDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFarmDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteFarm} />
        </>
    );
    const deleteFarmsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteFarmsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedFarms} />
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
                        value={farming.farms.data}
                        selection={selectedFarms}
                        onSelectionChange={(e) => setSelectedFarms(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} farms"
                        globalFilter={globalFilter}
                        emptyMessage="No farms found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
                        <Column field="firstname" header="Firstname" sortable body={farmNameBodyTemplate}></Column>
                        <Column field="lastname" header="Lastname" sortable body={lastnameBodyTemplate}></Column>
                        <Column field="phone" header="Phone" sortable body={phoneBodyTemplate}></Column>
                        <Column field="gender" header="Gender" sortable body={genderBodyTemplate}></Column>
                        <Column field="district" header="District" sortable body={districtBodyTemplate}></Column>
                        {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    {/* Updating Farm dialog box  */}
                    <Dialog visible={farmDialog} style={{ width: "450px" }} header="Farm Details" modal className="p-fluid" footer={farmDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="firstname">FirstName</label>
                            <InputText id="firstname" value={farm.firstname} onChange={(e) => onInputChange(e, "firstname")} required autoFocus className={classNames({ "p-invalid": submitted && !farm.firstname })} />
                            {submitted && !farm.firstname && <small className="p-invalid">FirstName is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">LastName</label>
                            <InputText id="lastname" value={farm.lastname} onChange={(e) => onInputChange(e, "lastname")} required rows={3} cols={20} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">Phone</label>
                            <InputText id="lastname" value={farm.phone} onChange={(e) => onInputChange(e, "phone")} required rows={3} cols={20} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="lastname">District</label>
                            <InputText id="lastname" value={farm.district} onChange={(e) => onInputChange(e, "district")} required rows={3} cols={20} />
                        </div>
                    </Dialog>
                    {/* Deleting Farm confirmation Dialog */}
                    <Dialog visible={deleteFarmDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteFarmDialogFooter} onHide={hideDeleteFarmDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {farm && (
                                <span>
                                    Are you sure you want to delete <b>{farm.nid}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteFarmsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteFarmsDialogFooter} onHide={hideDeleteFarmsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {farm && <span>Are you sure you want to delete the selected farms?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
