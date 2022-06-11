import { Switch, Route } from "react-router-dom";
import { decode } from "jsonwebtoken";
//modified
import { FarmerForm } from "./features/Farmers/FarmerForm";
import { AllFarmers } from "./features/Farmers/AllFarmers";
import { AddAnimal } from "./features/Animals/AddAnimal";
import { AllAnimals } from "./features/Animals/AllAnimals";
import { AllOperations } from "./features/operations/AllOperations";
import "./App.scss";
import Register from "./features/User/Register";
import { Login } from "./features/User/Login";
import { Reset } from "./features/User/Reset_password";
import { Forgot } from "./features/User/Forgot_password";
import AppShell from "./AppShell";
import AppSigmaRoute from "./AppSigmaRoute";
import { AddFarm } from "./features/Farm/AddFarm";
import { useDispatch, useSelector } from "react-redux";
import { FarmsTable } from "./features/Farm/FarmsTable";
import { logout } from "./features/User/UserSlice";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(logout());
        }
    }
    return (
        <>
            {
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
                        <Route path="/addFarm" component={AddFarm} />
                        <Route path="/allFarms" component={FarmsTable} />
                        <Route path="/allAnimals" component={AllAnimals} />
                        <Route path="/addAnimal" component={AddAnimal} />
                        <Route path="/allOperations" component={AllOperations} />
                    </AppShell>
                </Switch>
            }
        </>
    );
};
