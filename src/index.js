import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Auth'
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter , Switch, Route } from "react-router-dom";
import ScrollToTop from './ScrollToTop';

ReactDOM.render(
    <BrowserRouter>
    <Auth/>
  
    <Switch>
    <ScrollToTop>
            <App></App>
        </ScrollToTop>
        </Switch>
    
       
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();