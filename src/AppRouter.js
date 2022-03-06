import { Switch, Route } from "react-router-dom";
//modified
import { FarmerForm } from "./features/Farmers/FarmerForm";
import { AllFarmers } from "./features/Farmers/AllFarmers";
import { AddAnimal } from "./myPages/Animals/AddAnimal";
import { AllAnimals } from "./myPages/Animals/AllAnimals";
import { AllOperations } from "./myPages/operations/AllOperations";
import "./App.scss";
import Register from "./features/User/Register";
import { Login } from "./features/User/Login";
import { Reset } from "./features/User/Reset_password";
import { Forgot } from "./features/User/Forgot_password";
import AppShell from "./AppShell";
import AppSigmaRoute from "./AppSigmaRoute";

export const AppRouter = () => {
    return (
        <>
            <Switch>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/reset" exact component={Reset} />
                <Route path="/forgot" exact component={Forgot} />

                <AppShell>
                    <AppSigmaRoute />
                    {/* my own paths */}
                    <Route path="/addFarmer" component={FarmerForm} />
                    <Route path="/allFarmers" component={AllFarmers} />
                    <Route path="/allAnimals" component={AllAnimals} />
                    <Route path="/addAnimal" component={AddAnimal} />
                    <Route path="/allOperations" component={AllOperations} />
                </AppShell>
            </Switch>
        </>
    );
};
