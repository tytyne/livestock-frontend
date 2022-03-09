import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import AnimalService from "./AnimalService";

export const AllAnimals = () => {
    let emptyAnimal = {
        id: null,
        farmerId: " ",
        earring_num: "",
        nid: "",
        animal_cat: "",
        birthdate: "",
        birthkgs: " ",
        parent: " ",
        expected_exit: " ",
        expected_exit_kgs: "",
    };

    //my own codes
    const [animals, setAnimals] = useState(null);
    const [animalDialog, setAnimalDialog] = useState(false);
    const [deleteAnimalDialog, setDeleteAnimalDialog] = useState(false);
    const [deleteAnimalsDialog, setDeleteAnimalsDialog] = useState(false);
    const [animal, setAnimal] = useState(emptyAnimal);
    const [selectedAnimals, setSelectedAnimals] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    //my codes
    useEffect(() => {
        const animalService = new AnimalService();
        animalService.getAnimalServices().then((data) => {
            console.log("check dataa", data);
            setAnimals(data.data);
        });
    }, []);

    //my own codes
    const openNew = () => {
        setAnimal(emptyAnimal);
        setSubmitted(false);
        setAnimalDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAnimalDialog(false);
    };

    //my own codes
    const hideDeleteAnimalDialog = () => {
        setDeleteAnimalDialog(false);
    };

    // const hideDeleteProductsDialog = () => {
    //     setDeleteProductsDialog(false);
    // }

    //my own codes

    const hideDeleteAnimalsDialog = () => {
        setDeleteAnimalsDialog(false);
    };
    const saveAnimal = () => {
        setSubmitted(true);

        if (animal.name.trim()) {
            let _animals = [...animals];
            let _animal = { ...animal };
            if (animal.id) {
                const index = findIndexById(animal.id);

                _animal[index] = _animal;
                toast.current.show({ severity: "success", summary: "Successful", detail: "Animal Updated", life: 3000 });
            } else {
                _animal.id = createId();
                _animals.push(_animal);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Animal Created", life: 3000 });
            }

            setAnimals(_animals);
            setAnimalDialog(false);
            setAnimal(emptyAnimal);
        }
    };

    const editAnimal = (animal) => {
        setAnimal({ ...animal });
        setAnimalDialog(true);
    };

    const confirmDeleteAnimal = (animal) => {
        setAnimal(animal);
        setDeleteAnimalDialog(true);
    };

    const deleteAnimal = () => {
        let _animals = animals.filter((val) => val.id !== animal.id);
        setAnimals(_animals);
        setDeleteAnimalDialog(false);
        setAnimal(emptyAnimal);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Animal Deleted", life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].id === id) {
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
        setDeleteAnimalsDialog(true);
    };

    const deleteSelectedAnimals = () => {
        let _animals = animals.filter((val) => !selectedAnimals.includes(val));
        setAnimals(_animals);
        setDeleteAnimalsDialog(false);
        setSelectedAnimals(null);
        toast.current.show({ severity: "success", summary: "Successful", detail: "Animals Deleted", life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _animal = { ...animal };
        _animal["category"] = e.value;
        setAnimal(_animal);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _animal = { ...animal };
        _animal[`${name}`] = val;

        setAnimal(_animal);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _animal = { ...animal };
        _animal[`${name}`] = val;

        setAnimal(_animal);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAnimals || !selectedAnimals.length} />
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

    const earingNumberBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Earring Number</span>
                {rowData.earring_num}
            </>
        );
    };

    const nidBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Lastname</span>
                {rowData.lastname}
            </>
        );
    };
    const animalCategoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">animal category</span>
                {rowData.animal_cat}
            </>
        );
    };

    const BirthdateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Birthdats</span>
                {rowData.birthdate}
            </>
        );
    };
    const BirthKgsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Birthdats</span>
                {rowData.birthkgs}
            </>
        );
    };
    const expectedExitBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Expected Exit</span>
                {rowData.expected_exit}
            </>
        );
    };
    const expectedExitKgsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Expected Exit</span>
                {rowData.expected_exit_kgs}
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editAnimal(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteAnimal(rowData)} />
            </div>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Animals</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const animalDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveAnimal} />
        </>
    );
    const deleteAnimalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAnimalDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAnimal} />
        </>
    );
    const deleteAnimalsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAnimalsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedAnimals} />
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
                        value={animals}
                        selection={selectedAnimals}
                        onSelectionChange={(e) => setSelectedAnimals(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} animals"
                        globalFilter={globalFilter}
                        emptyMessage="No animals found."
                        header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
                        <Column field="earring_num" header="Earring" sortable body={earingNumberBodyTemplate}></Column>
                        <Column field="nid" header="Owner" sortable body={nidBodyTemplate}></Column>
                        <Column field="animal-cat" header="animal Cat" sortable body={animalCategoryBodyTemplate}></Column>
                        <Column field="birthdate" header="Birthdate" sortable body={BirthdateBodyTemplate}></Column>
                        <Column field="birthkgs" header="Birth kgs" sortable body={BirthKgsBodyTemplate}></Column>
                        <Column field="expected_exit_kgs" header="Expected Exit kgs" sortable body={expectedExitKgsBodyTemplate}></Column>
                        {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={animalDialog} style={{ width: "450px" }} header="Animal Details" modal className="p-fluid" footer={animalDialogFooter} onHide={hideDialog}>
                        <div className="p-field">
                            <label htmlFor="earring_num">earring_num</label>
                            <InputText id="earring_num" value={animal.earring_num} onChange={(e) => onInputChange(e, "earring_num")} required autoFocus className={classNames({ "p-invalid": submitted && !animal.earring_num })} />
                            {submitted && !animal.earring_num && <small className="p-invalid">Animal is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="nid">nid</label>
                            <InputText id="nid" value={animal.nid} onChange={(e) => onInputChange(e, "nid")} required rows={3} cols={20} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="animal_cat">animal_cat</label>
                            <InputText id="animal_cat" value={animal.animal_cat} onChange={(e) => onInputChange(e, "animal_cat")} required rows={3} cols={20} />
                        </div>
                        <div className="expected_exit">
                            <label htmlFor="expected_exit">expected_exit</label>
                            <InputText id="expected_exit" value={animal.expected_exit} onChange={(e) => onInputChange(e, "expected_exit")} required rows={3} cols={20} />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAnimalDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteAnimalDialogFooter} onHide={hideDeleteAnimalDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {animal && (
                                <span>
                                    Are you sure you want to delete <b>{animal.nid}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAnimalsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteAnimalsDialogFooter} onHide={hideDeleteAnimalsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {animal && <span>Are you sure you want to delete the selected animals?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
