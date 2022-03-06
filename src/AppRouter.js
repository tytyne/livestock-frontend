import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard } from "./components/Dashboard";
//modified
import { AddFArmer } from "./myPages/Farmers/AddFarmer";
import { AllFarmers } from "./myPages/Farmers/AllFarmers";
import { AddAnimal } from "./myPages/Animals/AddAnimal";
import { AllAnimals } from "./myPages/Animals/AllAnimals";
import { AllOperations } from "./myPages/operations/AllOperations";
import "./App.scss";
import Register from "./features/Authentication/Register";
import { Login } from "./features/Authentication/Login";
import { Reset } from "./features/Authentication/Reset_password";
import { Forgot } from "./features/Authentication/Forgot_password";
import AppShell from "./AppShell";
import AppSigmaRoute from "./AppSigmaRoute";
import { logout } from "./slices/auth";
import EventBus from "./common/EventBus";
export const AppRouter = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    useEffect(() => {
        if (currentUser) {
            console.log("state", currentUser);
        } else {
            // setShowModeratorBoard(false);
            // setShowAdminBoard(false);
            console.log("state", "props", props.location);
        }
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);
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
