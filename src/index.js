import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "bootstrap/dist/css/bootstrap.css";
let persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <ScrollToTop>
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
