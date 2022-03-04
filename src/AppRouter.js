import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard } from "./components/Dashboard";
//modified
import { AddFArmer } from "./myPages/Farmers/AddFarmer";
import { AllFarmers } from "./myPages/Farmers/AllFarmers";
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
import EventBus from "./common/EventBus";
import { userSelector, clearState, fetchUserBytoken } from "./features/User/UserSlice";

export const AppRouter = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isFetching, isError } = useSelector(userSelector);
    useEffect(() => {
        dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }));
    }, []);
    const { username, email } = useSelector(userSelector);
    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            // dispatch(clearState());
            history.push("/");
        } else {
            dispatch(clearState());
            history.push("/login");
        }
    }, [isError]);
    const onLogOut = () => {
        localStorage.removeItem("token");
        history.push("/login");
    };

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
                    <Route path="/addFarmer" component={AddFArmer} />
                    <Route path="/allFarmers" component={AllFarmers} />
                    <Route path="/allAnimals" component={AllAnimals} />
                    <Route path="/addAnimal" component={AddAnimal} />
                    <Route path="/allOperations" component={AllOperations} />
                </AppShell>
            </Switch>
        </>
    );
};
